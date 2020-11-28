import React from 'react';

interface SubtitleBlockProps {
  text: string;
}

export const SubtitleBlock: React.FunctionComponent<SubtitleBlockProps> = ({
  text,
}) => {
  return <h6>{text}</h6>;
};
