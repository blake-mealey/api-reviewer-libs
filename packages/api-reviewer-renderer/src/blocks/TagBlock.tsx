import React from 'react';
import { Chip } from '@material-ui/core';

export interface TagBlockProps {
  text: string;
}

export const TagBlock: React.FunctionComponent<TagBlockProps> = ({ text }) => {
  return <Chip color="secondary" label={text} />;
};
