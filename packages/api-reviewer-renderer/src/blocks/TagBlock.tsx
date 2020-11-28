import React from 'react';
import styled from 'styled-components';

const StyledTag = styled.span`
  background-color: ${p => p.theme.colors.accent.base};
  color: ${p => p.theme.colors.accent.text};
  border-radius: 100px;
  padding: ${p => p.theme.spacing(1)}px;
`;

interface TagBlockProps {
  text: string;
}

export const TagBlock: React.FunctionComponent<TagBlockProps> = ({ text }) => {
  return <StyledTag>{text}</StyledTag>;
};
