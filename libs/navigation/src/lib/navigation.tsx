import {Drawer, List, ListItem, ListItemText, makeStyles} from "@material-ui/core";
import {BrowserRouter as Router, Link as RouterLink, Route, Switch} from "react-router-dom";
import {Statistics} from "../../../statistics/src/lib/statistics";
import {WatchLecture} from "../../../watch-lecture/src/lib/watch-lecture";
import {Login} from "../../../login/src/lib/login";
import {SignUp} from "@seba/login";
import {CreateLecture} from "../../../create-lecture/src/lib/create-lecture";
import React from "react";

/* eslint-disable-next-line */
export interface NavigationProps {
}

const drawerWidth = 240;

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

export function Navigation(props: NavigationProps) {

  const classes = useStyles();

  return (
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
                <ListItemText primary="Create Lecture"/>
              </ListItem>
              <ListItem button component={RouterLink} to="/watch">
                <ListItemText primary="Watch Lecture"/>
              </ListItem>
              <ListItem button component={RouterLink} to="/stats">
                <ListItemText primary="Statistics"/>
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
              <Statistics/>
            </Route>
            <Route path="/watch">
              <WatchLecture/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/signup">
              <SignUp/>
            </Route>
            <Route path="/">
              <CreateLecture/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default Navigation;
