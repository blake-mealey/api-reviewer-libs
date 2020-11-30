import { createMuiTheme } from '@material-ui/core/styles';
import { green, lightGreen } from '@material-ui/core/colors';

export const lightTheme = createMuiTheme({
  palette: {
    primary: green,
    secondary: lightGreen,
  },
});
