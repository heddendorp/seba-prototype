import React from 'react';
import {SignUp, Login} from "@seba/login";
import {
  Switch,
  Route,
  BrowserRouter,
  Redirect,
} from 'react-router-dom';
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import AppContainer from './app-container/app-container';

let theme = createMuiTheme({
  shape:{
    borderRadius: 8,
  },
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: red[500],
    },
  },
  overrides:{
    MuiPaper:{
      rounded:{
        borderRadius: 16,
      }
    }
  }
});
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
  
}));

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
                <AppContainer/>
              </Route>
            </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
