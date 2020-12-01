import * as React from 'react';
import { IApiDocument } from 'api-reviewer-converter/dist/api-document/IApiDocument';
import { blocks } from './blocks';
import { IApiBlock } from 'api-reviewer-converter/dist/api-document/IApiBlock';
import { RootProvider } from './providers/RootProvider';
import { BlockAction, BlockProvider } from './providers/BlockProvider';
import { PointerMapProvider } from './providers/PointerMapProvider';
import { Grid } from '@material-ui/core';

interface ApiDocumentProps {
  document: IApiDocument;
  actions?: BlockAction[];
  onBlockFocus?(block?: IApiBlock): void;
}

export const ApiDocument: React.FunctionComponent<ApiDocumentProps> = ({
  document,
  actions,
  onBlockFocus,
}) => {
  console.debug('Rendering document', document);

  function renderBlock(
    block: IApiBlock
  ): React.FunctionComponentElement<any> | null {
    const component = blocks[`${block.type}Block`];

    if (!component) {
      return null;
    }

    return (
      <Grid item key={block.pointer}>
        <BlockProvider
          block={block}
          actions={actions}
          onBlockFocus={onBlockFocus}
        >
          {React.createElement(
            component,
            block.data,
            ...block.children.map(block => renderBlock(block))
          )}
        </BlockProvider>
      </Grid>
    );
  }

  return (
    <RootProvider>
      <PointerMapProvider pointerMap={document.pointerMap}>
        <Grid container direction="column" spacing={2}>
          {document.blocks.map(block => renderBlock(block))}
        </Grid>
      </PointerMapProvider>
    </RootProvider>
  );
};
