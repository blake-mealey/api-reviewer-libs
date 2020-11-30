import 'styled-components';
import { Theme as MuiTheme } from '@material-ui/core/styles';

declare module 'styled-components' {
  export interface DefaultTheme extends MuiTheme {}
}
