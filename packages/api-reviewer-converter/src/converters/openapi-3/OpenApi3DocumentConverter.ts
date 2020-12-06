import { ApiBlock } from '../../api-document/ApiBlock';
import ApiDocumentConverter from '../ApiDocumentConverter';
import { PointerMapFactory } from '../PointerMapFactory';
import { schema } from './schema';
import { PointerMap } from '../../api-document/IApiDocument';
import { Collection, Node } from 'yaml/types';
import { parse } from 'json-pointer';
import { IApiBlock } from '../../api-document/IApiBlock';
import {
  ConverterHandlerMap,
  IConverterHandlerContext,
} from '../ConverterHandler';
import * as handlers from './handlers';

function getInCollection(collection: Collection, pointer: string[]) {
  while (pointer.length > 0 && collection) {
    const property = pointer.shift();
    collection = collection.get(property);
  }

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
            subPointer: string | null,
            data: Record<string, any>,
            children?: IApiBlock[]
          ) {
            return new ApiBlock(
              type,
              subPointer ? [...parsedPointer, ...parse(subPointer)] : null,
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
          has<TNode extends Node>(
            subPointer: string,
            callback: (node: TNode) => void
          ) {
            const node = (getInCollection(
              collection,
              parse(subPointer)
            ) as unknown) as TNode;
            if (node) {
              callback(node);
            }
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

    this.walkPointers(pointerMap, handlers);

    return this.builder.build();
  }
}

export default OpenApi3DocumentConverter;
