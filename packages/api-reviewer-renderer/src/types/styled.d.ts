import 'styled-components';

declare module 'styled-components' {
  interface ThemeColor {
    base: string;
    text: string;
  }

  interface ThemeFont {
    family: string;
    weight: number;
    size: string;
    lineHeight: number;
    letterSpacing: string;
  }

  interface ThemeFonts {
    defaults: {
      family: string;
      htmlFontSize: string;
    };
    h1: ThemeFont;
    h2: ThemeFont;
    h3: ThemeFont;
    h4: ThemeFont;
    h5: ThemeFont;
    h6: ThemeFont;
    subtitle1: ThemeFont;
    subtitle2: ThemeFont;
    body1: ThemeFont;
    body2: ThemeFont;
    button: ThemeFont;
  }

  export interface DefaultTheme {
    colors: {
      main: ThemeColor;
      accent: ThemeColor;
    };

    spacing: (x: number) => number;

    shape: {
      roundness: 4;
    };

    fonts: ThemeFonts;
  }
}
