import { IApiBlock } from 'api-reviewer-converter/dist/api-document/IApiBlock';
import React, { useContext } from 'react';
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
  border-radius: ${p => p.theme.shape.roundness};
  padding: ${p => p.theme.spacing(1)}px;

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
  return (
    <BlockContext.Provider value={block}>
      <Container>{children}</Container>
    </BlockContext.Provider>
  );
};
