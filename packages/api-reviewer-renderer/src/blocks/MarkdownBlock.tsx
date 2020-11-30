import React from 'react';
import ReactMarkdown from 'react-markdown';

export interface MarkdownBlockProps {
  text: string;
}

export const MarkdownBlock: React.FunctionComponent<MarkdownBlockProps> = ({
  text,
}) => {
  return <ReactMarkdown children={text} />;
};
