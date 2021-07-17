import React from 'react';
import {SignUp, Login} from "@seba/login";
import {
  Switch,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import {
  createMuiTheme,
  CssBaseline,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import {Home} from "@seba/home";
import { SocketContext, socket } from '@seba/context';

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

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export const App = () => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <SocketContext.Provider value={socket}>
      <CssBaseline />
      <BrowserRouter>
        <div className={classes.root}>
          <main className={classes.content}>
            <Switch>
              <Route path="/" exact={true} component={Login}/>
              <Route path="/signup" component={SignUp}/>
              <Route path="/home" component={Home}/>
            </Switch>
          </main>
        </div>
      </BrowserRouter>
      </SocketContext.Provider>
    </ThemeProvider>
  );
};

export default App;
