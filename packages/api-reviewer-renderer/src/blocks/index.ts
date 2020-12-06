import { FunctionComponent } from 'react';
import { MarkdownBlock } from './MarkdownBlock';
import { TagBlock } from './TagBlock';
import { ColumnBlock } from './ColumnBlock';
import { RowBlock } from './RowBlock';

export const blocks: Record<string, FunctionComponent<any>> = {
  ColumnBlock,
  RowBlock,
  TagBlock,
  MarkdownBlock,
};
