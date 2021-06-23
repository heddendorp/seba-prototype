import React from 'react';
import {createMuiTheme, CssBaseline, responsiveFontSizes, ThemeProvider} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import {Navigation} from "@seba/navigation";

let theme = createMuiTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: red[500],
    },
  },
});
theme = responsiveFontSizes(theme);

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Navigation />
    </ThemeProvider>
  );
};

export default App;
