import React from 'react';

export interface TableColumnBlockProps {
  header: string;
}

export const TableColumnBlock: React.FunctionComponent<TableColumnBlockProps> = ({
  children,
}) => {
  return <>{children}</>;
};
