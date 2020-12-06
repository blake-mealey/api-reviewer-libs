import React from 'react';
import { Grid } from '@material-ui/core';

export interface ColumnLayoutProps {}

export const ColumnBlock: React.FunctionComponent<ColumnLayoutProps> = ({
  children,
}) => {
  return (
    <Grid container spacing={2} direction="column">
      {React.Children.map(children, child => (
        <Grid item>{child}</Grid>
      ))}
    </Grid>
  );
};
