import { createMuiTheme } from '@material-ui/core/styles/';

export const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1a1a5a',
      contrastText: '#ffd740',
      dark: '#333333',
    },
    secondary: {
      main: '#a9a9af',
    },
  },
});