import React from 'react';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const StyledMarkdown = styled(ReactMarkdown)`
  img {
    max-width: 100%;
  }
`;

export interface MarkdownBlockProps {
  text: string;
}

export const MarkdownBlock: React.FunctionComponent<MarkdownBlockProps> = ({
  text,
}) => {
  return <StyledMarkdown>{text}</StyledMarkdown>;
};
