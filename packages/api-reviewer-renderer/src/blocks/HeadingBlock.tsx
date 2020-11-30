import React from 'react';
import { Grid, Typography } from '@material-ui/core';

type HeadingLevel = 'title' | 'subtitle';

export interface HeadingBlockProps {
  text: string;
  level: HeadingLevel;
}

export const HeadingBlock: React.FunctionComponent<HeadingBlockProps> = ({
  text,
  level,
  children,
}) => {
  return (
    <Grid container spacing={2} direction="row">
      <Grid item>
        <Typography variant={level === 'title' ? 'h4' : 'h6'}>
          {text}
        </Typography>
      </Grid>
      <Grid item>{children}</Grid>
    </Grid>
  );
};
