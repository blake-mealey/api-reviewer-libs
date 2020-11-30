import React from 'react';
import { StylesProvider } from './StylesProvider';

export const RootProvider: React.FunctionComponent = ({ children }) => {
  return <StylesProvider>{children}</StylesProvider>;
};
