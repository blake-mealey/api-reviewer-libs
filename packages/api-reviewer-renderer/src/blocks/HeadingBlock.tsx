import React from 'react';
import styled, { ThemeFonts } from 'styled-components';
import { Text } from '../components/Text';

type HeadingLevel = 'title' | 'subtitle';

interface HeadingBlockProps {
  text: string;
  level: HeadingLevel;
}

const levelToType: Record<HeadingLevel, keyof Omit<ThemeFonts, 'defaults'>> = {
  title: 'h4',
  subtitle: 'h6',
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: ${p => p.theme.spacing(2)}px;
`;

export const HeadingBlock: React.FunctionComponent<HeadingBlockProps> = ({
  text,
  level,
  children,
}) => {
  return (
    <Container>
      <Text type={levelToType[level]}>{text}</Text>
      {children}
    </Container>
  );
};
