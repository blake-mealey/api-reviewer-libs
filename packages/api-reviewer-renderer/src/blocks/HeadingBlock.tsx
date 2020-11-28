import React from 'react';

interface SubtitleBlockProps {
  text: string;
  level: 'title' | 'subtitle';
}

export const HeadingBlock: React.FunctionComponent<SubtitleBlockProps> = ({
  text,
  level,
}) => {
  switch (level) {
    case 'title':
      return <h1>{text}</h1>;
    case 'subtitle':
      return <h3>{text}</h3>;
    default:
      return null;
  }
};
