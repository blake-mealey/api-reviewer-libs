import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../themes/GlobalStyle';
import { lightTheme } from '../themes/lightTheme';

export const RootProvider: React.FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <>
        {children}
        <GlobalStyle />
      </>
    </ThemeProvider>
  );
};
