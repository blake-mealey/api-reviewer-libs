import React from 'react';
import { Grid } from '@material-ui/core';

export interface RowLayoutProps {}

export const RowBlock: React.FunctionComponent<RowLayoutProps> = ({
  children,
}) => {
  return (
    <Grid container spacing={2} direction="row">
      {React.Children.map(children, child => (
        <Grid item>{child}</Grid>
      ))}
    </Grid>
  );
};
