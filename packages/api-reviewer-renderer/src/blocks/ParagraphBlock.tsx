import React from 'react';
import ReactMarkdown from 'react-markdown';
import { useBlock } from '../providers/BlockProvider';

interface ParagraphBlockProps {
  text: string;
}

export const ParagraphBlock: React.FunctionComponent<ParagraphBlockProps> = ({
  text,
}) => {
  const block = useBlock();
  console.log(block);

  return <ReactMarkdown children={text} />;
};
