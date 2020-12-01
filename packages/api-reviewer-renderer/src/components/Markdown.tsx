import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import styled from 'styled-components';

const StyledMarkdown = styled(ReactMarkdown)`
  img {
    max-width: 100%;
  }
`;

export interface MarkdownProps {
  markdown: string;
}

export const Markdown: React.FunctionComponent<MarkdownProps> = ({
  markdown,
}) => {
  return <StyledMarkdown plugins={[gfm]}>{markdown}</StyledMarkdown>;
};
