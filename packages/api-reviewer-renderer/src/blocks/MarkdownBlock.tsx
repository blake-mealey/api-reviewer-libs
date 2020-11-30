import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useBlock } from '../providers/BlockProvider';

export interface MarkdownBlockProps {
  text: string;
}

export const MarkdownBlock: React.FunctionComponent<MarkdownBlockProps> = ({
  text,
}) => {
  const block = useBlock();
  console.log(block);

  return <ReactMarkdown children={text} />;
};
