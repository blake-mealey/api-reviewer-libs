import React from 'react';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../themes/lightTheme';

export const RootProvider: React.FunctionComponent = ({ children }) => {
  return <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>;
};
