import * as React from 'react';
import { IApiDocument } from 'api-reviewer-converter/dist/api-document/IApiDocument';
import { blocks } from './blocks';
import { IApiBlock } from 'api-reviewer-converter/dist/api-document/IApiBlock';
import { RootProvider } from './providers/RootProvider';
import styled from 'styled-components';
import { BlockProvider } from './providers/BlockProvider';
import { PointerMapProvider } from './providers/PointerMapProvider';

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

  return (
    <BlockProvider block={block} key={block.pointer}>
      {React.createElement(
        component,
        block.data,
        ...block.children.map(renderBlock)
      )}
    </BlockProvider>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: ${p => p.theme.spacing(2)}px;
  width: max(75%, 800px);
  margin: ${p => p.theme.spacing(4)}px auto 0 auto;
`;

export const ApiDocument: React.FunctionComponent<ApiDocumentProps> = ({
  document,
}) => {
  console.debug('Rendering document', document);

  return (
    <RootProvider>
      <PointerMapProvider pointerMap={document.pointerMap}>
        <Container>{document.blocks.map(renderBlock)}</Container>
      </PointerMapProvider>
    </RootProvider>
  );
};
