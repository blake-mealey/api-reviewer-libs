import React from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  StylesProvider as MuiStylesProvider,
  CssBaseline,
} from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../themes/lightTheme';

export const StylesProvider: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <MuiStylesProvider injectFirst>
        <MuiThemeProvider theme={lightTheme}>
          <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
        </MuiThemeProvider>
      </MuiStylesProvider>
    </>
  );
};
