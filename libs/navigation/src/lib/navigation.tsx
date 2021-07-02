import {BrowserRouter as Router, Link as RouterLink, Route, Switch} from 'react-router-dom';
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
import {useStyles} from './style';
import {ILecture, ILectureUnit, IUser, Role} from '@seba/models';
import {useEffect, useState} from 'react';

import {CreateUnit} from '@seba/lecture/create-unit';
import {LectureCreate} from "@seba/lecture/create";
import {UserService} from "@seba/api-services";
import {LectureWatch} from "@seba/lecture/watch";
import {LectureQuestions} from "@seba/lecture/questions";
import {LectureQuizzes} from "@seba/lecture/quizzes";
import {Statistics} from "@seba/lecture/statistics";
import {LectureProvider, useLectureContext} from "@seba/context";

export function Navigation() {
  const classes = useStyles();
  const logoPath = "/assets/logo.png";

  const [user, setUser] = useState<IUser>();

  function StatisticsTab(lecture: ILecture) {
    if (user !== undefined && +user.role === Role.LECTURER)
      return (
        <ListItem button component={RouterLink} to={"/lecture/" + lecture._id + "/statistics"}>
          <ListItemText primary="Statistics"/>
        </ListItem>
      );
    return;
  }

  function CreateUnitButton(lecture: ILecture) {
    if (user !== undefined && +user.role === Role.LECTURER)
      return (
        <ListItem button component={RouterLink} to={"/lecture/" + lecture._id + "/unit/create"}>
          <ListItemText primary="Create..."/>
        </ListItem>
      );
    return;
  }

  function LectureUnits(units: [ILectureUnit]) {
    return units.map((unit) => (
      <Accordion>
        <AccordionSummary>{unit.title}</AccordionSummary>
        <AccordionDetails>
          <List>
            <ListItem button component={RouterLink} to={"/unit/" + unit._id + "/watch"}>
              <ListItemText>Video</ListItemText>
            </ListItem>
            <ListItem button component={RouterLink} to={"/unit/" + unit._id + "/questions"}>
              <ListItemText>Questions</ListItemText>
            </ListItem>
            <ListItem button component={RouterLink} to={"/unit/" + unit._id + "/quizzes"}>
              <ListItemText>Quizzes</ListItemText>
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    ));
  }

  function Lectures() {
    const context = useLectureContext();

    if (context.lectures !== undefined)
      return <>
        {context.lectures.map((lecture) => (
          <Accordion>
            <AccordionSummary>
              {lecture.title}
            </AccordionSummary>
            <AccordionDetails className={classes.lectureAccordion}>
              {StatisticsTab(lecture)}
              {LectureUnits(lecture.units)}
              {CreateUnitButton(lecture)}
            </AccordionDetails>
          </Accordion>
        ))}
      </>;
    return null;
  }

  function CreateButton() {
    if (user !== undefined && +user.role === Role.LECTURER)
      return (
        <ListItem button component={RouterLink} to="/lecture/create">
          <ListItemText primary="Create..."/>
        </ListItem>
      );
    return null;
  }

  useEffect(() => {
    UserService.getCurrent().then(user => setUser(user));
  }, []);

  return (
    <Router>
      <div className={classes.root}>
        <LectureProvider>
          <Drawer
            variant="permanent"
            className={classes.drawer}
            classes={{paper: classes.paper}}
          >
            <nav>
              <List>
                <div className={classes.logoContainer}>
                  <img src={logoPath} className={classes.logo} alt="Learn with me"/>
                </div>
                <Box border={1}/>
                <ListItem button component={RouterLink} to="/home">
                  <ListItemText primary="Home"/>
                </ListItem>
                <Box border={1}/>
                <Lectures/>
                <Box border={1}/>
                <CreateButton/>
              </List>
            </nav>
          </Drawer>
          <main className={classes.content}>
            <Switch>
              <Route path="/lecture/create">
                <LectureCreate/>
              </Route>
              <Route path="/lecture/:lecture_id/unit/create">
                <CreateUnit/>
              </Route>
              <Route path="/lecture/:lecture_id/statistics">
                <Statistics/>
              </Route>
              <Route path="/unit/:unit_id/watch">
                <LectureWatch/>
              </Route>
              <Route path="/unit/:unit_id/questions">
                <LectureQuestions/>
              </Route>
              <Route path="/unit/:unit_id/quizzes">
                <LectureQuizzes/>
              </Route>
            </Switch>
          </main>
        </LectureProvider>
      </div>
    </Router>
  );
}
