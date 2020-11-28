import * as React from 'react';
import { IApiDocument } from 'api-reviewer-converter/dist/api-document/IApiDocument';
import { blocks } from './blocks';

interface ApiDocumentProps {
  document: IApiDocument;
}

export const ApiDocument: React.FunctionComponent<ApiDocumentProps> = ({
  document,
}) => {
  return (
    <>
      {document.blocks.map(block =>
        React.createElement(blocks[`${block.type}Block`], {
          ...block.data,
          key: block.pointer,
        })
      )}
    </>
  );
};
