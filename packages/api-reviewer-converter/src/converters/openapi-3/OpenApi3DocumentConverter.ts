import { ApiBlock } from '../../api-document/ApiBlock';
import ApiDocumentConverter from '../ApiDocumentConverter';
import { PointerMapFactory } from '../PointerMapFactory';
import { schema } from './schema';
import { PointerMap } from '../../api-document/IApiDocument';
import { Collection, Node, Scalar } from 'yaml/types';
import { parse } from 'json-pointer';
import { IApiBlock } from '../../api-document/IApiBlock';

interface IPointerCallbackContext {
  node: Collection;
  add(block: IApiBlock): void;
  get<TNode extends Node>(pointer: string): TNode;
  block(
    type: string,
    subPointer: string,
    data: Record<string, any>,
    children?: IApiBlock[]
  ): IApiBlock;
}

function getInCollection(collection: Collection, pointer: string[]) {
  while (pointer.length > 0 && collection) {
    const property = pointer.shift();
    if (property !== '') {
      collection = collection.get(property);
    }
  }
  return collection as Node;
}

class OpenApi3DocumentConverter extends ApiDocumentConverter {
  convertInfoAndOpenApi() {}

  walkPointers(
    pointerMap: PointerMap,
    handlers: Record<string, (context: IPointerCallbackContext) => void>
  ) {
    pointerMap.forEach((pointerData, pointer) => {
      if (pointerData.schemaName) {
        const handler = handlers[pointerData.schemaName];
        if (handler) {
          const parsedPointer = parse(pointer);

          const collection = getInCollection(
            this.document.contents as Collection,
            parsedPointer
          ) as Collection;

          const blocks: IApiBlock[] = [];
          handler({
            node: collection,
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
              return (getInCollection(collection, [
                ...parsedPointer,
                ...parse(subPointer),
              ]) as unknown) as TNode;
            },
          });
          this.builder.appendBlocks(blocks);
          // TODO: If extensions, ...
        }
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
            text: `openapi v${get<Scalar>('/openapi').value}`,
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
          block('Paragraph', '/licence', {
            text: licenseText,
          })
        );
        add(
          block('Paragraph', '/description', {
            text: get<Scalar>('/description'),
          })
        );
      },
    });

    return this.builder.build();
  }
}

export default OpenApi3DocumentConverter;
