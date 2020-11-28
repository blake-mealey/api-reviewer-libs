import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ParagraphBlockProps {
  text: string;
}

export const ParagraphBlock: React.FunctionComponent<ParagraphBlockProps> = ({
  text,
}) => {
  return (
    <p>
      <ReactMarkdown children={text} />
    </p>
  );
};
