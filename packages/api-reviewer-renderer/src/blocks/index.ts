import { FunctionComponent } from 'react';
import { HeadingBlock } from './HeadingBlock';
import { MarkdownBlock } from './MarkdownBlock';
import { TagBlock } from './TagBlock';

export const blocks: Record<string, FunctionComponent<any>> = {
  HeadingBlock,
  TagBlock,
  MarkdownBlock,
};
