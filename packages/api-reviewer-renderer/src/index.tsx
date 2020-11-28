import * as React from 'react';
import { IApiDocument } from 'api-reviewer-converter/dist/api-document/IApiDocument';
import { blocks } from './blocks';
import { IApiBlock } from 'api-reviewer-converter/dist/api-document/IApiBlock';
import { RootProvider } from './providers/RootProvider';

interface ApiDocumentProps {
  document: IApiDocument;
}

function renderBlock(
  block: IApiBlock
): React.FunctionComponentElement<any> | null {
  const component = blocks[`${block.type}Block`];

  if (!component) {
    return null;
  }

  return React.createElement(
    component,
    {
      ...block.data,
      key: block.pointer,
    },
    ...block.children.map(renderBlock)
  );
}

export const ApiDocument: React.FunctionComponent<ApiDocumentProps> = ({
  document,
}) => {
  console.debug('Rendering document', document);

  return <RootProvider>{document.blocks.map(renderBlock)}</RootProvider>;
};
