import 'styled-components';

interface Color {
  base: string;
  text: string;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      main: Color;
      accent: Color;
    };

    spacing: (x: number) => number;
  }
}
