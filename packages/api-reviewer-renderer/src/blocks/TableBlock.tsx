import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@material-ui/core';

export interface TableBlockProps {
  header?: string;
}

export const TableBlock: React.FunctionComponent<TableBlockProps> = ({
  header,
  children,
}) => {
  const columns: Record<string, React.ReactNode[]> = {};
  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) {
      return;
    }

    const columnIndex = child.props.block.data.column;
    if (!(columnIndex in columns)) {
      columns[columnIndex] = [child];
    } else {
      columns[columnIndex].push(child);
    }
  });

  const rows: any[] = [];
  const iterate = (i: number) => {
    let hadEntry = false;
    let row: any[] = [];
    Object.values(columns).forEach(column => {
      const item = column[i];
      if (!hadEntry) {
        hadEntry = Boolean(item);
      }
      row.push(item);
    });
    if (hadEntry) {
      rows.push(row);
      iterate(i + 1);
    }
  };
  iterate(0);

  // const rows = Object.values(columns).map((_, colIndex) =>
  //   Object.values(columns).map(row => row[colIndex])
  // );

  return (
    <>
      {header ? (
        <Toolbar>
          <Typography variant="h6">{header}</Typography>
        </Toolbar>
      ) : null}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {React.Children.map(rows[0], child => (
                <TableCell>{child}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(1).map(row => (
              <TableRow>
                {React.Children.map(row, child => (
                  <TableCell>{child}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
