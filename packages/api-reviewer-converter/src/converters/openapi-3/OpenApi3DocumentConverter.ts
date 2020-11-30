import { ApiBlock } from '../../api-document/ApiBlock';
import ApiDocumentConverter from '../ApiDocumentConverter';
import { PointerMapFactory } from '../PointerMapFactory';
import { schema } from './schema';
import { PointerMap } from '../../api-document/IApiDocument';
import { Collection, Node, Scalar } from 'yaml/types';
import { parse } from 'json-pointer';
import { IApiBlock } from '../../api-document/IApiBlock';
import {
  ConverterHandlerMap,
  IConverterHandlerContext,
} from '../ConverterHandler';

function getInCollection(collection: Collection, pointer: string[]) {
  console.log(pointer);

  while (pointer.length > 0 && collection) {
    const property = pointer.shift();
    collection = collection.get(property);
  }
  console.log(collection);

  return collection as Node;
}

class OpenApi3DocumentConverter extends ApiDocumentConverter {
  convertInfoAndOpenApi() {}

  walkPointers(pointerMap: PointerMap, handlers: ConverterHandlerMap) {
    pointerMap.forEach((pointerData, pointer) => {
      if (pointerData.schemaName) {
        const parsedPointer = pointer === '/' ? [] : parse(pointer);

        const collection = getInCollection(
          this.document.contents as Collection,
          [...parsedPointer]
        ) as Collection;

        const blocks: IApiBlock[] = [];

        const context: IConverterHandlerContext = {
          block(
            type: string,
            subPointer: string,
            data: Record<string, any>,
            children?: IApiBlock[]
          ) {
            return new ApiBlock(
              type,
              [...parsedPointer, ...parse(subPointer)],
              data,
              children
            );
          },
          add(block: IApiBlock) {
            blocks.push(block);
          },
          get<TNode>(subPointer: string) {
            return (getInCollection(
              collection,
              parse(subPointer)
            ) as unknown) as TNode;
          },
        };

        const handler = handlers[pointerData.schemaName];
        if (handler) {
          handler(context);
        }

        if (pointerData.supportsExtensions && this.options?.extensions) {
          this.options.extensions
            .filter(extension => pointerData.schemaName in extension.handlers)
            .forEach(extension => {
              const properties = Object.entries(extension.definition)
                .filter(([k]) => k.includes('.'))
                .flatMap(([, v]) =>
                  Object.entries(v)
                    .filter(([, schema]) => {
                      const rules = schema.oas3;
                      if (!rules || rules.usage === 'prohibited') {
                        return false;
                      }

                      return (
                        rules.usage === 'unrestricted' ||
                        (rules.usage === 'restricted' &&
                          rules.objectTypes?.includes(pointerData.schemaName))
                      );
                    })
                    .map(([property]) => property)
                );

              properties.forEach(property => {
                if (collection.has(property)) {
                  const handler = extension.handlers[pointerData.schemaName];
                  handler(context);
                }
              });
            });
        }

        this.builder.appendBlocks(blocks);
      }
    });
  }

  async convert() {
    const pointerMap = new PointerMapFactory(
      this.documentString,
      this.document,
      schema
    ).createPointerMap();

    this.builder.setPointerMap(pointerMap);

    this.walkPointers(pointerMap, {
      OpenAPI: ({ add, block, get }) => {
        add(
          block('Heading', '/openapi', {
            text: `openapi v${get<Scalar>('/openapi')}`,
            level: 'subtitle',
          })
        );
      },
      Info: ({ add, get, block }) => {
        add(
          block(
            'Heading',
            '/title',
            {
              text: get<Scalar>('/title') ?? '_No Title_',
              level: 'title',
            },
            [
              block('Tag', '/version', {
                text: get<Scalar>('/version') ?? '_No Version_',
              }),
            ]
          )
        );

        const name = get<Scalar>('/license/name');
        const url = get<Scalar>('/licence/url');
        let licenseText: string;
        if (name && url) {
          licenseText = `License: [${name}](${url})`;
        } else if (name) {
          licenseText = `License: ${name}`;
        } else if (url) {
          licenseText = `License: <${url}>`;
        }
        add(
          block('Markdown', '/licence', {
            text: licenseText,
          })
        );
        add(
          block('Markdown', '/description', {
            text: get<Scalar>('/description'),
          })
        );
      },
    });

    return this.builder.build();
  }
}

export default OpenApi3DocumentConverter;
