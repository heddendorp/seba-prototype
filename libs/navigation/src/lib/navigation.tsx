/* eslint-disable-next-line */
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link as RouterLink,
  useLocation,
} from 'react-router-dom';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import { useStyles } from './style';
import {ILectureUnit, Role} from '@seba/models';
import { useEffect, useState } from 'react';

import { CreateUnit } from '@seba/lecture/create-unit';
import {LectureCreate} from "@seba/lecture/create";
import {LectureService} from "../../../api-services/src/lib/lecture-service";

export interface NavigationProps {}

export function Navigation(props: NavigationProps) {
  const location = useLocation();
  const classes = useStyles();

  const lectureCreatePath = {
    pathname: '/lecture/create',
    state: location.state,
  };

  const lectureUnitCreatePath = {
    pathname: '/lecture-unit/create',
    state: location.state,
  };

  const [lectures, setLectures] = useState();

  function renderLectureUnits(units: [ILectureUnit]) {
    const lectureUnits = [];

      for (const lectureUnit of units)
        lectureUnits.push(
          <Accordion>
            <AccordionSummary>{lectureUnit.title}</AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemText>Questions</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Quiz</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>Video</ListItemText>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        );

    return lectureUnits;
  }

  function clickMe(event, lecture) {
    location.state.lecture = lecture;
    console.log('Set state');
  }

  useEffect(() => {
    async function getLectures() {
      const response = await LectureService.getAll();

      const body = await response.json();
      if (response.status !== 200) console.log(body);

      const lectures = [];
      for (const lecture of body) {
        const url = '/lecture/overview/' + lecture._id;
        lectures.push(
          <Accordion>
            <AccordionSummary onClick={(e) => clickMe(e, lecture)}>
              {lecture.title}
            </AccordionSummary>
            <AccordionDetails>
              {renderLectureUnits(lecture.units)}
            </AccordionDetails>
            <ListItem button component={RouterLink} to={lectureUnitCreatePath}>
              <ListItemText primary="Create..." />
            </ListItem>
          </Accordion>
        );
      }

      setLectures(lectures);
    }

    getLectures();
  }, []);

  function getCreateButton() {
    if (+location.state.role === Role.LECTURER)
      return (
        <ListItem button component={RouterLink} to={lectureCreatePath}>
          <ListItemText primary="Create..." />
        </ListItem>
      );
    return;
  }

  return (
    <Router>
      <div className={classes.root}>
        <Drawer
          variant="permanent"
          className={classes.drawer}
          classes={{ paper: classes.paper }}
        >
          <nav>
            <List>
              <div className={classes.logoContainer}>
                <img src="/assets/logo.png" className={classes.logo} />
              </div>
              <Box border={1} />
              <ListItem button component={RouterLink} to="/home">
                <ListItemText primary="Home" />
              </ListItem>
              <Box border={1} />
              {lectures}
              <Box border={1} />
              {getCreateButton()}
            </List>
          </nav>
        </Drawer>
        <main className={classes.content}>
          <Switch>
            <Route path="/lecture/create">
              <LectureCreate />
            </Route>
            <Route path="/lecture-unit/create">
              <CreateUnit />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default Navigation;
