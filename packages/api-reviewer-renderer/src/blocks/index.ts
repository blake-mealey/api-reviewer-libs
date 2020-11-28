import { FunctionComponent } from 'react';
import { HeadingBlock } from './HeadingBlock';
import { ParagraphBlock } from './ParagraphBlock';
import { TagBlock } from './TagBlock';

export const blocks: Record<string, FunctionComponent<any>> = {
  HeadingBlock,
  TagBlock,
  ParagraphBlock,
};
