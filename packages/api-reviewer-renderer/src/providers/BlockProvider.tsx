import { Box, Button, Fade, Grid } from '@material-ui/core';
import { IApiBlock } from 'api-reviewer-converter/dist/api-document/IApiBlock';
import React, { useContext, useRef, useState } from 'react';
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
  border-radius: ${p => p.theme.shape.borderRadius}px;
  transition: ease-in-out 0.1s;

  &:hover,
  &:focus,
  &.focused {
    background-color: rgba(0, 0, 0, 0.01);
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
    outline: none;
  }
`;

const ActionGroupBox = styled(Box)`
  transform: translate(0, -50%);
`;

const ActionButton = styled(Button)`
  min-width: 0;
  padding: ${p => p.theme.spacing(1)}px;

  transform: scale(0.6);
  &:hover,
  &:focus {
    transform: scale(0.8);
  }
`;

export interface BlockAction {
  icon: React.Component;
  onClick(block: IApiBlock): void;
}

interface ActionGroupProps {
  onActionClick(action: BlockAction): void;
  actions: BlockAction[];
}

const ActionGroup = React.forwardRef<HTMLButtonElement, ActionGroupProps>(
  ({ actions, onActionClick, ...props }, ref) => {
    return (
      <ActionGroupBox position="absolute" top="50%" right="100%" {...props}>
        <Grid container direction="row" spacing={1}>
          {actions?.map((action, i) => (
            <Grid item key={i}>
              <ActionButton
                ref={ref}
                variant="contained"
                color="secondary"
                disableFocusRipple
                onClick={() => onActionClick(action)}
              >
                {action.icon}
              </ActionButton>
            </Grid>
          )) ?? null}
        </Grid>
      </ActionGroupBox>
    );
  }
);

export interface BlockProviderProps {
  block: IApiBlock;
  actions?: BlockAction[];
  onBlockFocus?(block?: IApiBlock): void;
}

export const BlockProvider: FunctionComponent<BlockProviderProps> = ({
  block,
  actions,
  onBlockFocus,
  children,
}) => {
  const [actionsOpen, setActionsOpen] = useState<boolean>(false);
  const actionsGroupRef = useRef<HTMLButtonElement | null>(null);

  const openActions = () => {
    setActionsOpen(true);
    if (onBlockFocus) {
      onBlockFocus(block);
    }
  };
  const closeActions = (
    e: React.MouseEvent<HTMLElement, MouseEvent> | React.FocusEvent<HTMLElement>
  ) => {
    if (e.relatedTarget !== actionsGroupRef.current) {
      setActionsOpen(false);
      if (onBlockFocus) {
        onBlockFocus(undefined);
      }
    }
  };

  return (
    <BlockContext.Provider value={block}>
      {block.pointer ? (
        <Box position="relative">
          <Container
            className={actionsOpen ? 'focused' : undefined}
            tabIndex={0}
            onMouseEnter={openActions}
            onMouseLeave={closeActions}
            onFocus={openActions}
            onBlur={closeActions}
          >
            {actions ? (
              <Fade in={actionsOpen} timeout={100}>
                <ActionGroup
                  ref={actionsGroupRef}
                  actions={actions}
                  onActionClick={action => action.onClick(block)}
                />
              </Fade>
            ) : null}
            <Box p={1}>{children}</Box>
          </Container>
        </Box>
      ) : (
        children
      )}
    </BlockContext.Provider>
  );
};
