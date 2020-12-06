import { FunctionComponent } from 'react';
import { MarkdownBlock } from './MarkdownBlock';
import { TagBlock } from './TagBlock';

export const blocks: Record<string, FunctionComponent<any>> = {
  TagBlock,
  MarkdownBlock,
};
