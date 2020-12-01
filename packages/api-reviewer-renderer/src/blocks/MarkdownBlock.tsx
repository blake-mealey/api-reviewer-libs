import React from 'react';
import { Markdown } from '../components/Markdown';

export interface MarkdownBlockProps {
  text: string;
}

export const MarkdownBlock: React.FunctionComponent<MarkdownBlockProps> = ({
  text,
}) => {
  return <Markdown markdown={text} />;
};
