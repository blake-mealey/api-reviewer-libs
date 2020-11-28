import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    main: { base: '#43A047', text: '#FFFFFF' },
    accent: { base: '#76FF03', text: '#000000' },
  },
  shape: {
    roundness: '4px',
  },
  spacing: x => x * 8,
  fonts: {
    defaults: {
      family: '"Roboto", "Helvetica", "Arial", sans-serif',
      htmlFontSize: '16px',
    },
    h1: {
      family: '"Roboto", "Helvetica", "Arial", sans-serif',
      weight: 300,
      size: '6rem',
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
    },
    h2: {
      family: '"Roboto", "Helvetica", "Arial", sans-serif',
      weight: 300,
      size: '3.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      family: '"Roboto", "Helvetica", "Arial", sans-serif',
      weight: 400,
      size: '3rem',
      lineHeight: 1.167,
      letterSpacing: '0em',
    },
    h4: {
      family: '"Roboto", "Helvetica", "Arial", sans-serif',
      weight: 400,
      size: '2.125rem',
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
    },
    h5: {
      family: '"Roboto", "Helvetica", "Arial", sans-serif',
      weight: 400,
      size: '1.5rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
    h6: {
      family: '"Roboto", "Helvetica", "Arial", sans-serif',
      weight: 500,
      size: '1.25rem',
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      family: '"Roboto", "Helvetica", "Arial", sans-serif',
      weight: 400,
      size: '1rem',
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      family: '"Roboto", "Helvetica", "Arial", sans-serif',
      weight: 500,
      size: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      family: '"Roboto", "Helvetica", "Arial", sans-serif',
      weight: 400,
      size: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      family: '"Roboto", "Helvetica", "Arial", sans-serif',
      weight: 400,
      size: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    button: {
      family: '"Roboto", "Helvetica", "Arial", sans-serif',
      weight: 500,
      size: '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.2857em',
    },
  },
};
