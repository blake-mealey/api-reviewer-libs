import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  colors: {
    main: { base: '#43A047', text: '#FFFFFF' },
    accent: { base: '#76FF03', text: '#000000' },
  },
  spacing: x => x * 8,
};
