import { ApiBlock } from '../../api-document/ApiBlock';
import ApiDocumentConverter from '../ApiDocumentConverter';
import { PointerMapFactory } from '../PointerMapFactory';
import { schema } from './schema';
import { PointerMap } from '../../api-document/IApiDocument';
import { Document } from 'yaml';
import { Collection, Node } from 'yaml/types';
import { parse, compile } from 'json-pointer';
import { IApiBlock } from '../../api-document/IApiBlock';
import { IConverterHandlerContext } from '../ConverterHandler';
import * as handlers from './handlers';
import { DocumentWalker } from '../../utils/DocumentWalker';
import { IConverterOptions } from '../IConverterOptions';
import { IPointerData } from '../../api-document/IPointerData';

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
  schemaPath: string[];
  schemaSupportsExtensions: boolean;
}

class OpenApi3DocumentConverter extends ApiDocumentConverter {
  private documentWalker: DocumentWalker;
  private pointerMap: PointerMap;
  private handlers = handlers;

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
    subPointer: string,
    node: Node,
    path: string[],
    pointerData?: IPointerData
  ): IConverterHandlerContext {
    return {
      subPointer,
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
      get<TNode>(subPointer: string) {
        return (getInCollection(
          context.schemaNode,
          parse(subPointer)
        ) as unknown) as TNode;
      },
      table([header, ...rows]: string[][]) {
        const formatRow = row => `|${row.join('|')}|\n`;
        return (
          formatRow(header) +
          formatRow(header.map(() => '---')) +
          rows.map(formatRow).join('')
        );
      },
      convertSubPaths: () => {
        return this.convertNodes({
          node,
          path,
          schemaSupportsExtensions: pointerData?.schemaName
            ? pointerData.supportsExtensions
            : context.schemaSupportsExtensions,
          schemaName: pointerData?.schemaName ?? context.schemaName,
          schemaNode: pointerData?.schemaName
            ? (node as Collection)
            : context.schemaNode,
          schemaPath: pointerData?.schemaName ? path : context.schemaPath,
        });
      },
    };
  }

  convertNodes(context: IWalkContext) {
    const blocks: IApiBlock[] = [];
    this.documentWalker.shallowWalk(context.node, (nodePath, node) => {
      const path = [...context.path, ...nodePath];
      const pointer = compile(path);

      // TODO: Based on schema path!
      const subPath = path.slice(context.schemaPath.length);

      const pointerData = this.pointerMap.get(pointer);
      const handlerContext: IConverterHandlerContext = this.createHandlerContext(
        context,
        compile(subPath),
        node,
        path,
        pointerData
      );

      const handler = handlers[context.schemaName];
      if (handler) {
        const result: IApiBlock | IApiBlock[] = handler(handlerContext);
        if (result) {
          if (Array.isArray(result)) {
            blocks.push(...result);
          } else {
            blocks.push(result);
          }
        }
      }

      // TODO: Extensions
    });
    return blocks;
  }

  async convert() {
    const pointerMap = new PointerMapFactory(
      this.documentString,
      this.document,
      schema
    ).createPointerMap();

    this.builder.setPointerMap(pointerMap);
    this.pointerMap = pointerMap;

    const blocks = this.convertNodes({
      node: this.document.contents,
      path: [],
      schemaName: 'OpenAPI',
      schemaNode: this.document.contents as Collection,
      schemaPath: [],
      schemaSupportsExtensions: true,
    });
    this.builder.appendBlocks(blocks);

    return this.builder.build();
  }
}

export default OpenApi3DocumentConverter;
