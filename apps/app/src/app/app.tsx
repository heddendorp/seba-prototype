import React from 'react';
import { CreateLecture } from '@seba/create-lecture';
import { WatchLecture } from '@seba/watch-lecture';
import { Statistics } from '@seba/statistics';
import {SignUp, Login} from "@seba/login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link as RouterLink,
} from 'react-router-dom';
import {
  createMuiTheme,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

const drawerWidth = 240;

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
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
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
      <CssBaseline />
      <Router>
        <div className={classes.root}>
          <Drawer
            variant="permanent"
            anchor="left"
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <nav>
              <List>
                <ListItem button component={RouterLink} to="/">
                  <ListItemText primary="Create Lecture" />
                </ListItem>
                <ListItem button component={RouterLink} to="/watch">
                  <ListItemText primary="Watch Lecture" />
                </ListItem>
                <ListItem button component={RouterLink} to="/stats">
                  <ListItemText primary="Statistics" />
                </ListItem>
                <ListItem button component={RouterLink} to="/login">
                  <ListItemText primary="Login"/>
                </ListItem>
              </List>
            </nav>
          </Drawer>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <main className={classes.content}>
            <Switch>
              <Route path="/stats">
                <Statistics />
              </Route>
              <Route path="/watch">
                <WatchLecture />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/">
                <CreateLecture />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
