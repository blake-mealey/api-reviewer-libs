import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import React, { ElementType } from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import styled from 'styled-components';

const StyledMarkdown = styled(ReactMarkdown)`
  img {
    max-width: 100%;
  }
`;

const renderers: { [nodeType: string]: ElementType } = {
  heading({ level, children }) {
    const levelToVariant: {
      [level: number]: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    } = {
      1: 'h1',
      2: 'h2',
      3: 'h3',
      4: 'h4',
      5: 'h5',
      6: 'h6',
    };
    return <Typography variant={levelToVariant[level]}>{children}</Typography>;
  },
  paragraph({ children }) {
    return <Typography variant="body1">{children}</Typography>;
  },
  link({ href, children }) {
    return <Link href={href}>{children}</Link>;
  },
  table({ children, ...props }) {
    console.log(props);
    return <Table>{children}</Table>;
  },
  tableHead({ children, ...props }) {
    console.log(props);
    return <TableHead>{children}</TableHead>;
  },
  tableBody({ children, ...props }) {
    console.log(props);
    return <TableBody>{children}</TableBody>;
  },
  tableRow({ children, ...props }) {
    console.log(props);
    return <TableRow>{children}</TableRow>;
  },
  tableCell({ children, align, ...props }) {
    console.log(props);
    return <TableCell align={align ?? 'inherit'}>{children}</TableCell>;
  },
};

export interface MarkdownProps {
  markdown: string;
}

export const Markdown: React.FunctionComponent<MarkdownProps> = ({
  markdown,
}) => {
  return (
    <StyledMarkdown plugins={[gfm]} renderers={renderers} children={markdown} />
  );
};
