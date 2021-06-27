/* eslint-disable-next-line */
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
import React, {ChangeEvent, useEffect, useState} from 'react';

import {CreateUnit} from '@seba/lecture/create-unit';
import {LectureCreate} from "@seba/lecture/create";
import {LectureService, UserService} from "@seba/api-services";
import LectureWatch from "../../../lecture/watch/src/lib/lecture-watch";
import LectureQuestions from "../../../lecture/questions/src/lib/lecture-questions";
import {LectureQuizzes} from "@seba/lecture/quizzes";
import {Statistics} from "@seba/lecture/statistics";
import { Questions } from '../../../questions/src/lib/questions';

export function Navigation() {
  const classes = useStyles();
  const logoPath = "/assets/logo.png";

  const [renderedLectures, setRenderedLectures] = useState();
  const [renderedCreateButton, setRenderedCreateButton] = useState();

  function renderLectureUnits(units: [ILectureUnit]) {
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

  function renderStatisticsTab(user: IUser, lecture: ILecture) {
    if (+user.role === Role.LECTURER)
      return (
        <ListItem button component={RouterLink} to={"/lecture/" + lecture._id + "/statistics"}>
          <ListItemText primary="Statistics"/>
        </ListItem>
      );
    return;
  }

  function renderCreateUnitButton(user: IUser, lecture: ILecture) {
    if (+user.role === Role.LECTURER)
      return (
        <ListItem button component={RouterLink} to={"/lecture/" + lecture._id + "/unit/create"}>
          <ListItemText primary="Create..."/>
        </ListItem>
      );
    return;
  }

  async function renderLectures() {
    const lectures = await LectureService.getAll();
    const currentUser = await UserService.getCurrent();

    return lectures.map((lecture) => (
      <Accordion>
        <AccordionSummary>
          {lecture.title}
        </AccordionSummary>
        {renderStatisticsTab(currentUser, lecture)}
        <AccordionDetails className={classes.lectureAccordion}>
          {renderLectureUnits(lecture.units)}
        </AccordionDetails>
        {renderCreateUnitButton(currentUser, lecture)}
      </Accordion>
    ));
  }

  async function renderCreateButton() {
    const currentUser = await UserService.getCurrent();
    if (+currentUser.role === Role.LECTURER)
      return (
        <ListItem button component={RouterLink} to="/lecture/create">
          <ListItemText primary="Create..."/>
        </ListItem>
      );
    return;
  }

  useEffect(() => {
    const setRenderedLecturesDelayed = async () => setRenderedLectures(await renderLectures());
    const setRenderedCreateButtonDelayed = async () => setRenderedCreateButton(await renderCreateButton());

    setRenderedLecturesDelayed();
    setRenderedCreateButtonDelayed();
  }, []);

  return (
    <Router>
      <div className={classes.root}>
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
              <ListItem button component={RouterLink} to="/questions">
                <ListItemText primary="Questions"/>
              </ListItem>
              <Box border={1}/>
              {renderedLectures}
              <Box border={1}/>
              {renderedCreateButton}
            </List>
          </nav>
        </Drawer>
        <main className={classes.content}>
          <Switch>
            <Route path="/questions" component={Questions}/>
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
      </div>
    </Router>
  );
}

export default Navigation;
