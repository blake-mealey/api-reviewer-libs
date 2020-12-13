import React from 'react';
import styled from 'styled-components';

const ColumnLayout = styled.div`
  & > * {
    padding: ${p => p.theme.spacing(2) / 2}px 0;
  }
`;

export interface ColumnBlockProps {}

export const ColumnBlock: React.FunctionComponent<ColumnBlockProps> = ({
  children,
}) => {
  return <ColumnLayout>{children}</ColumnLayout>;
};
