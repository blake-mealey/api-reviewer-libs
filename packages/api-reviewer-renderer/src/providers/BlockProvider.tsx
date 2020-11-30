import { Box, Button, Grid, Popper } from '@material-ui/core';
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

const ActionButton = styled(Button)`
  min-width: 0;
  padding: 0;

  transform: scale(0.8);
  &:hover {
    transform: scale(1);
  }
`;

export interface BlockAction {
  icon: React.Component;
  onClick(block: IApiBlock): void;
}

export interface BlockProviderProps {
  block: IApiBlock;
  actions?: BlockAction[];
}

export const BlockProvider: FunctionComponent<BlockProviderProps> = ({
  block,
  actions,
  children,
}) => {
  const [actionsAnchorEl, setActionsAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const actionsOpen = Boolean(actionsAnchorEl);

  const openActions = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setActionsAnchorEl(e.currentTarget);
  };
  const closeActions = () => {
    setActionsAnchorEl(null);
  };

  return (
    <BlockContext.Provider value={block}>
      <Container onMouseEnter={openActions} onMouseLeave={closeActions}>
        <Box p={1}>{children}</Box>
        <Popper open={actionsOpen} anchorEl={actionsAnchorEl} placement="left">
          <Grid container direction="row" spacing={1}>
            {actions?.map((action, i) => (
              <Grid item key={i}>
                <ActionButton
                  variant="contained"
                  color="secondary"
                  onClick={() => action.onClick(block)}
                >
                  {action.icon}
                </ActionButton>
              </Grid>
            )) ?? null}
          </Grid>
        </Popper>
      </Container>
    </BlockContext.Provider>
  );
};
