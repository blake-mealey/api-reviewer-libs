import { ApiBlock } from '../../api-document/ApiBlock';
import ApiDocumentConverter from '../ApiDocumentConverter';
import { PointerMapFactory } from '../PointerMapFactory';
import { schema } from './schema';
import { PointerMap } from '../../api-document/IApiDocument';
import { Document } from 'yaml';
import { Collection, Node } from 'yaml/types';
import { parse } from 'json-pointer';
import { IApiBlock } from '../../api-document/IApiBlock';

interface IPointerCallbackContext {
  node: Collection;
  addBlock: (block: IApiBlock) => void;
}

function getInDocument(document: Document.Parsed, pointer: string) {
  let collection = document.contents as Collection;
  const pointerParts = parse(pointer);

  while (pointerParts.length > 0) {
    const property = pointerParts.shift();
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
          const collection = getInDocument(
            this.document,
            pointer
          ) as Collection;
          const blocks: IApiBlock[] = [];
          handler({
            node: collection,
            addBlock: (block: IApiBlock) => {
              blocks.push(block);
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
      OpenAPI: ({ node, addBlock }) => {
        addBlock(
          new ApiBlock('Heading', ['openapi'], {
            text: `openapi v${node.get('openapi')}`,
            level: 'subtitle',
          })
        );
      },
      Info: ({ node, addBlock }) => {
        addBlock(
          new ApiBlock(
            'Heading',
            ['info', 'title'],
            {
              text: node.get('title'),
              level: 'title',
            },
            [
              new ApiBlock('Tag', ['info', 'version'], {
                text: `v${node.get('version')}`,
              }),
            ]
          )
        );

        const license = node.get('license');
        const name = license.get('name');
        const url = license.get('url');
        let licenseText: string;
        if (name && url) {
          licenseText = `License: [${name}](${url})`;
        } else if (name) {
          licenseText = `License: ${name}`;
        } else if (url) {
          licenseText = `License: <${url}>`;
        }
        addBlock(
          new ApiBlock('Paragraph', ['info', 'license'], {
            text: licenseText,
          })
        );

        addBlock(
          new ApiBlock('Paragraph', ['info', 'description'], {
            text: node.get('description'),
          })
        );
      },
    });

    return this.builder.build();
  }
}

export default OpenApi3DocumentConverter;
