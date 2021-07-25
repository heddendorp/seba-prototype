import React from 'react';
import { Login, SignUp } from '@seba/frontend/login';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core';
import { green, pink, red, teal } from '@material-ui/core/colors';
import AppContainer from './app-container/app-container';

let theme = createMuiTheme({
  shape: {
    borderRadius: 8,
  },
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: pink[500],
    },
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: 16,
      },
    },
  },
});
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({}));

export const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true}>
            <Redirect to="/login"></Redirect>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/app">
            <AppContainer />
          </Route>
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
