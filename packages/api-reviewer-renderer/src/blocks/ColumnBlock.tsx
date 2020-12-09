import React from 'react';
import styled from 'styled-components';

const ColumnLayout = styled.div`
  & > * {
    padding: ${p => p.theme.spacing(2) / 2}px;
  }
`;

export interface ColumnLayoutProps {}

export const ColumnBlock: React.FunctionComponent<ColumnLayoutProps> = ({
  children,
}) => {
  return <ColumnLayout>{children}</ColumnLayout>;
};
