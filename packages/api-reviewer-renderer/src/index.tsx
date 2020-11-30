import * as React from 'react';
import { IApiDocument } from 'api-reviewer-converter/dist/api-document/IApiDocument';
import { blocks } from './blocks';
import { IApiBlock } from 'api-reviewer-converter/dist/api-document/IApiBlock';
import { RootProvider } from './providers/RootProvider';
import { BlockAction, BlockProvider } from './providers/BlockProvider';
import { PointerMapProvider } from './providers/PointerMapProvider';
import { Box, Container, Grid } from '@material-ui/core';

interface ApiDocumentProps {
  document: IApiDocument;
  actions?: BlockAction[];
}

function renderBlock(
  block: IApiBlock,
  actions?: BlockAction[]
): React.FunctionComponentElement<any> | null {
  const component = blocks[`${block.type}Block`];

  if (!component) {
    return null;
  }

  return (
    <Grid item key={block.pointer}>
      <BlockProvider block={block} actions={actions}>
        {React.createElement(
          component,
          block.data,
          ...block.children.map(block => renderBlock(block, actions))
        )}
      </BlockProvider>
    </Grid>
  );
}

export const ApiDocument: React.FunctionComponent<ApiDocumentProps> = ({
  document,
  actions,
}) => {
  console.debug('Rendering document', document);

  return (
    <RootProvider>
      <PointerMapProvider pointerMap={document.pointerMap}>
        <Container maxWidth="md">
          <Box mt={4}>
            <Grid container direction="column" spacing={2}>
              {document.blocks.map(block => renderBlock(block, actions))}
            </Grid>
          </Box>
        </Container>
      </PointerMapProvider>
    </RootProvider>
  );
};
