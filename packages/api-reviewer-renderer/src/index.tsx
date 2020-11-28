import * as React from 'react';
import { IApiDocument } from 'api-reviewer-converter/dist/api-document/IApiDocument';
import { blocks } from './blocks';

interface ApiDocumentProps {
  document: IApiDocument;
}

export const ApiDocument: React.FunctionComponent<ApiDocumentProps> = ({
  document,
}) => {
  console.debug('Rendering document', document);

  return (
    <>
      {document.blocks.map(block => {
        const component = blocks[`${block.type}Block`];

        if (!component) {
          return null;
        }

        return React.createElement(component, {
          ...block.data,
          key: block.pointer,
        });
      })}
    </>
  );
};
