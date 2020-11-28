import React from 'react';
import styled from 'styled-components';

const StyledTag = styled.span`
  background-color: blue;
  color: white;
  border-radius: 100px;
  padding: 5px;
`;

interface TagBlockProps {
  text: string;
}

export const TagBlock: React.FunctionComponent<TagBlockProps> = ({ text }) => {
  return <StyledTag>{text}</StyledTag>;
};
