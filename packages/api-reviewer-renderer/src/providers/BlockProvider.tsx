import { Box, Button, Popover } from '@material-ui/core';
import { IApiBlock } from 'api-reviewer-converter/dist/api-document/IApiBlock';
import React, { useContext, useState } from 'react';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

const BlockContext = React.createContext<IApiBlock | null>(null);

export const useBlock = () => {
  const block = useContext(BlockContext);
  if (!block) {
    throw new Error(
      'Attemped to use `useBlock` when not below a `Block` element'
    );
  }
  return block;
};

const Container = styled.div`
  border-radius: ${p => p.theme.shape.borderRadius};

  &:hover {
    background-color: rgba(0, 0, 0, 0.025);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

interface BlockProviderProps {
  block: IApiBlock;
}

export const BlockProvider: FunctionComponent<BlockProviderProps> = ({
  block,
  children,
}) => {
  const [actionsAnchorEl, setActionsAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const actionsOpen = Boolean(actionsAnchorEl);
  console.log(actionsOpen);

  return (
    <BlockContext.Provider value={block}>
      <Container
        title={block.pointer}
        onMouseEnter={e => setActionsAnchorEl(e.currentTarget)}
        onMouseLeave={() => setActionsAnchorEl(null)}
      >
        <Box p={1}>{children}</Box>
      </Container>
      <Popover
        open={actionsOpen}
        anchorEl={actionsAnchorEl}
        anchorOrigin={{ vertical: 'center', horizontal: 'left' }}
        transformOrigin={{ vertical: 'center', horizontal: 'right' }}
        onClose={() => setActionsAnchorEl(null)}
        disableRestoreFocus
      >
        <Button>+</Button>
      </Popover>
    </BlockContext.Provider>
  );
};
