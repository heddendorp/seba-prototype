import {
  Redirect,
  Route,
  Router,
  Switch,
  useRouteMatch,
} from 'react-router-dom';
import { LectureProvider, useLectureContext } from '@seba/frontend/context';
import { Home } from '@seba/frontend/home';
import { LectureWatch } from '@seba/frontend/lecture/watch';
import {
  CreateLectureUnit,
  EditLectureUnit,
} from '@seba/frontend/lecture/create-unit';
import { CreateLecture, EditLecture } from '@seba/frontend/lecture/create';
import { LectureQuizzes } from '@seba/frontend/lecture/quizzes';
import { Statistics } from '@seba/frontend/lecture/statistics';
import { Questions } from '@seba/frontend/lecture/questions';
import {
  createStyles,
  Drawer,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { Navigation } from '@seba/frontend/navigation';
import { SocketContext, socket } from '@seba/frontend/context';

/* eslint-disable-next-line */
export interface AppContainerProps {}

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    title: {
      position: 'absolute',
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(4),
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      background: 'none',
      border: 'none',
      marginTop: theme.spacing(5),
      marginLeft: theme.spacing(2),
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      marginLeft: theme.spacing(4),
      marginTop: theme.spacing(10),
      minHeight: `calc(100vh - ${theme.spacing(10)}px)`,
      boxShadow: theme.shadows[6],
      borderTopLeftRadius: 16,
    },
  })
);

export function AppContainer(props: AppContainerProps) {
  const { path, url } = useRouteMatch();
  const classes = useStyles();
  return (
    <LectureProvider>
      <SocketContext.Provider value={socket}>
        <div className={classes.root}>
          <Drawer
            variant="permanent"
            className={classes.drawer}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Navigation />
          </Drawer>
          <main className={classes.content}>
            <Switch>
              <Route path={`${path}/`} exact={true}>
                <Redirect to={`${url}/home`} />
              </Route>
              <Route path={`${path}/home`}>
                <Home />
              </Route>
              <Route path={`${path}/lecture/create`}>
                <CreateLecture />
              </Route>
              <Route path={`${path}/lecture/:lecture_id/edit`}>
                <EditLecture />
              </Route>
              <Route path={`${path}/lecture/:lecture_id/unit/create`}>
                <CreateLectureUnit />
              </Route>
              <Route path={`${path}/unit/:unit_id/edit`}>
                <EditLectureUnit />
              </Route>
              <Route path={`${path}/lecture/:lecture_id/statistics`}>
                <Statistics />
              </Route>
              <Route path={`${path}/unit/:unit_id/watch`}>
                <LectureWatch />
              </Route>
              <Route path={`${path}/unit/:unit_id/questions`}>
                <Questions />
              </Route>
              <Route path={`${path}/unit/:unit_id/quizzes`}>
                <LectureQuizzes />
              </Route>
            </Switch>
          </main>
        </div>
      </SocketContext.Provider>
    </LectureProvider>
  );
}

export default AppContainer;
