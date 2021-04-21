/*
 *  PrimaryTheme.js
 *  Themes are stored here
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import { createMuiTheme } from '@material-ui/core/styles/';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1a1a5a',
      contrastText: '#ffd740',
      dark: '#333333',
    },
    secondary: {
      main: '#ffd740',
      contrastText: '#1a1a5a',
      dark: '#333333',
    }
  },
});