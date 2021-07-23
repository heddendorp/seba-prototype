/* eslint-disable-next-line */
import {
  Link as RouterLink,
  useRouteMatch,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import {
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { useStyles } from './style';
import { ILecture, ILectureUnit, IUser, Role } from '@seba/backend/models';
import React, { useEffect, useState } from 'react';
import { UserService } from '@seba/frontend/api-services';

import { LectureProvider, useLectureContext } from '@seba/frontend/context';
import {
  Assignment,
  Edit,
  ExpandLess,
  ExpandMore,
  Folder,
  Home,
  Lock,
  OndemandVideo,
  QuestionAnswer,
  ShowChart,
} from '@material-ui/icons';
import Add from '@material-ui/icons/Add';

export function Navigation() {
  const { path, url } = useRouteMatch();
  const logoPath = '/assets/logo.png';

  const [user, setUser] = useState<IUser>();

  interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
  }

  function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to } = props;

    const renderLink = React.useMemo(
      () =>
        React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((itemProps, ref) => (
          <RouterLink to={to} ref={ref} {...itemProps} />
        )),
      [to]
    );

    return (
      <li>
        <ListItem button component={renderLink}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }

  useEffect(() => {
    UserService.getCurrent().then((user) => setUser(user));
  }, []);

  const context = useLectureContext();

  const [openLecture, setOpenLecture] = useState('');
  const [openUnit, setOpenUnit] = useState('');

  return (
    <>
      <img
        src={logoPath}
        alt="Learn with me logo"
        style={{ width: '100%', marginBottom: 16 }}
      />
      <List component="nav">
        <ListItemLink icon={<Home />} primary="Home" to={`${url}/home`} />
      </List>
      <Divider />
      <List component="nav">
        {context.lectures !== undefined &&
          context.lectures.map((lecture) => (
            <>
              <ListItem button onClick={() => setOpenLecture(lecture._id)}>
                <ListItemIcon>
                  <Folder />
                </ListItemIcon>
                <ListItemText primary={lecture.short_title} />
                {openLecture == lecture._id ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse
                in={openLecture == lecture._id}
                timeout="auto"
                unmountOnExit
                style={{ marginLeft: 16 }}
              >
                {user !== undefined && +user.role === Role.LECTURER && (
                  <>
                    <ListItemLink
                      to={`${url}/lecture/${lecture._id}/edit`}
                      icon={<Edit />}
                      primary={`Edit ${lecture.short_title}`}
                    />
                    <ListItemLink
                      icon={<ShowChart />}
                      primary="Statistics"
                      to={`${url}/lecture/${lecture._id}/statistics`}
                    />
                  </>
                )}
                {lecture.units.map((unit) => (
                  <>
                    <ListItem button onClick={() => setOpenUnit(unit._id)}>
                      <ListItemIcon>
                        <Folder />
                      </ListItemIcon>
                      <ListItemText primary={unit.title} />
                      {openUnit == unit._id ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                      in={openUnit == unit._id}
                      timeout="auto"
                      unmountOnExit
                      style={{ marginLeft: 16 }}
                    >
                      {user !== undefined && +user.role === Role.LECTURER && (
                        <ListItemLink
                          to={`${url}/unit/${unit._id}/edit`}
                          icon={<Edit />}
                          primary={`Edit ${unit.title}`}
                        />
                      )}
                      <ListItemLink
                        to={`${url}/unit/${unit._id}/watch`}
                        icon={<OndemandVideo />}
                        primary="Watch"
                      />
                      <ListItemLink
                        to={`${url}/unit/${unit._id}/questions`}
                        icon={<QuestionAnswer />}
                        primary="Questions"
                      />
                      <ListItemLink
                        to={`${url}/unit/${unit._id}/quizzes`}
                        icon={<Assignment />}
                        primary="Quizzes"
                      />
                    </Collapse>
                  </>
                ))}
                {user !== undefined && +user.role === Role.LECTURER && (
                  <ListItemLink
                    icon={<Add />}
                    primary="Create Unit"
                    to={`${url}/lecture/${lecture._id}/unit/create`}
                  />
                )}
              </Collapse>
            </>
          ))}
        {user !== undefined && +user.role === Role.LECTURER && (
          <ListItemLink
            icon={<Add />}
            primary="Create Lecture"
            to={`${url}/lecture/create`}
          />
        )}
      </List>
      <Divider />
      <List component="nav">
        <ListItem button onClick={async () => await UserService.logout()}>
          <ListItemIcon>
            <Lock />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </>
  );
}
