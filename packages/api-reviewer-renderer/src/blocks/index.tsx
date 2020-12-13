import { FunctionComponent } from 'react';
import { MarkdownBlock } from './MarkdownBlock';
import { TagBlock } from './TagBlock';
import { ColumnBlock } from './ColumnBlock';
import { RowBlock } from './RowBlock';
import { TableBlock } from './TableBlock';
import { TableColumnBlock } from './TableColumnBlock';

export const blocks: Record<string, FunctionComponent<any>> = {
  ColumnBlock,
  RowBlock,
  TagBlock,
  MarkdownBlock,
  // TableBlock: props => {
  //   return (
  //     <TableContainer>
  //       <Table {...props} />
  //     </TableContainer>
  //   );
  // },
  // TableHeadBlock: TableHead,
  // TableBodyBlock: TableBody,
  // TableRowBlock: TableRow,
  // TableCellBlock: TableCell,

  TableBlock,
  TableColumnBlock,
};
