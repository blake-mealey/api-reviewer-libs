import { ApiBlock } from '../../api-document/ApiBlock';
import ApiDocumentConverter from '../ApiDocumentConverter';
import { PointerMapFactory } from '../PointerMapFactory';
import { schema } from './schema';
import { PointerMap } from '../../api-document/IApiDocument';
import { Document } from 'yaml';
import { Collection, Node } from 'yaml/types';
import { parse, compile } from 'json-pointer';
import { IApiBlock } from '../../api-document/IApiBlock';
import {
  ConverterHandlerMap,
  IConverterHandlerContext,
} from '../ConverterHandler';
import * as handlers from './handlers';
import { DocumentWalker } from '../../utils/DocumentWalker';
import { IConverterOptions } from '../IConverterOptions';

function getInCollection(collection: Collection, pointer: string[]) {
  while (pointer.length > 0 && collection) {
    const property = pointer.shift();
    collection = collection.get(property);
  }

  return collection as Node;
}

interface IWalkContext {
  path: string[];
  node: Node;
  schemaName: string;
  schemaNode: Collection;
  schemaSupportsExtensions: boolean;
}

class OpenApi3DocumentConverter extends ApiDocumentConverter {
  private documentWalker: DocumentWalker;

  constructor(
    documentString: string,
    document: Document.Parsed,
    options: IConverterOptions
  ) {
    super(documentString, document, options);
    this.documentWalker = new DocumentWalker();
  }

  createHandlerContext(
    context: IWalkContext,
    subPointer: string
  ): IConverterHandlerContext {
    const blocks: IApiBlock[] = [];
    return {
      blocks,
      subPointer,
      is<TNode>(otherSubPointer: string, callback: (node: TNode) => void) {
        if (subPointer === otherSubPointer) {
          callback(
            (getInCollection(
              context.schemaNode,
              parse(subPointer)
            ) as unknown) as TNode
          );
        }
      },
      block(
        type: string,
        subPointer: string | null,
        data: Record<string, any>,
        children?: IApiBlock[]
      ) {
        return new ApiBlock(
          type,
          subPointer ? [...context.path, ...parse(subPointer)] : null,
          data,
          children
        );
      },
      add(block: IApiBlock) {
        blocks.push(block);
      },
      get<TNode>(subPointer: string) {
        return (getInCollection(
          context.schemaNode,
          parse(subPointer)
        ) as unknown) as TNode;
      },
      has<TNode>(subPointer: string, callback: (node: TNode) => void) {
        const node = (getInCollection(
          context.schemaNode,
          parse(subPointer)
        ) as unknown) as TNode;
        if (node) {
          callback(node);
        }
      },
      table([header, ...rows]: string[][]) {
        const formatRow = row => `|${row.join('|')}|\n`;
        return (
          formatRow(header) +
          formatRow(header.map(() => '---')) +
          rows.map(formatRow).join('')
        );
      },
    };
  }

  walkNodes(
    pointerMap: PointerMap,
    handlers: ConverterHandlerMap,
    context: IWalkContext
  ) {
    this.documentWalker.shallowWalk(context.node, (nodePath, node) => {
      const path = [...context.path, ...nodePath];
      const pointer = compile(path);

      const subPath = path.slice(context.path.length);

      const handlerContext: IConverterHandlerContext = this.createHandlerContext(
        context,
        compile(subPath)
      );

      const handler = handlers[context.schemaName];
      if (handler) {
        handler(handlerContext);
      }

      // TODO: Simplify and improve
      if (context.schemaSupportsExtensions && this.options?.extensions) {
        this.options.extensions
          .filter(extension => context.schemaName in extension.handlers)
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
                        rules.objectTypes?.includes(context.schemaName))
                    );
                  })
                  .map(([property]) => property)
              );

            properties.forEach(property => {
              if (context.schemaNode.has(property)) {
                const handler = extension.handlers[context.schemaName];
                if (handler) {
                  handler(handlerContext);
                }
              }
            });
          });
      }

      this.builder.appendBlocks(handlerContext.blocks);

      const pointerData = pointerMap.get(pointer);
      this.walkNodes(pointerMap, handlers, {
        node,
        path,
        schemaSupportsExtensions: pointerData?.schemaName
          ? pointerData.supportsExtensions
          : context.schemaSupportsExtensions,
        schemaName: pointerData?.schemaName ?? context.schemaName,
        schemaNode: pointerData?.schemaName
          ? (node as Collection)
          : context.schemaNode,
      });
    });
  }

  async convert() {
    const pointerMap = new PointerMapFactory(
      this.documentString,
      this.document,
      schema
    ).createPointerMap();

    this.builder.setPointerMap(pointerMap);

    this.walkNodes(pointerMap, handlers, {
      node: this.document.contents,
      path: [],
      schemaName: 'OpenAPI',
      schemaNode: this.document.contents as Collection,
      schemaSupportsExtensions: true,
    });
    // this.walkPointers(pointerMap, handlers);

    return this.builder.build();
  }
}

export default OpenApi3DocumentConverter;
