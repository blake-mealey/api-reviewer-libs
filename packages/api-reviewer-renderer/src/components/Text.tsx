import React, { ReactHTML } from 'react';
import { FunctionComponent } from 'react';
import { ThemeFonts, useTheme } from 'styled-components';

type TextType = keyof Omit<ThemeFonts, 'defaults'>;

interface TextProps {
  type: TextType;
}

const componentMapping: Record<TextType, keyof ReactHTML> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  button: 'span',
};

const defaultComponent = 'span';

export const Text: FunctionComponent<TextProps> = ({ type, children }) => {
  const theme = useTheme();

  const Component = componentMapping[type] || defaultComponent;

  return (
    <Component
      style={{
        fontFamily: theme.fonts[type].family,
        fontWeight: theme.fonts[type].weight,
        fontSize: theme.fonts[type].size,
        letterSpacing: theme.fonts[type].letterSpacing,
        lineHeight: theme.fonts[type].lineHeight,
      }}
    >
      {children}
    </Component>
  );
};
