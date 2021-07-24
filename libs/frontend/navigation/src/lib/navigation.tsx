/* eslint-disable-next-line */
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useRouteMatch,
} from 'react-router-dom';
import {
  Collapse,
  createMuiTheme,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  responsiveFontSizes,
  SvgIcon,
  ThemeProvider,
  Typography,
  useTheme,
} from '@material-ui/core';
import { IUser, Role } from '@seba/backend/models';
import React, { useEffect, useState } from 'react';
import { UserService } from '@seba/frontend/api-services';

import { useLectureContext } from '@seba/frontend/context';
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
import { green, red } from '@material-ui/core/colors';

export function Navigation() {
  const { path, url } = useRouteMatch();
  const logoPath = '/assets/brainstorm.svg';

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

  function LectureIcon(props: any) {
    return (
      <SvgIcon {...props} viewBox="0 0 30 30">
        <g id="surface35641194">
          <path d="M 8 3 C 6.34375 3 5 4.34375 5 6 L 5 24 C 5 24.265625 5.105469 24.519531 5.296875 24.707031 C 5.648438 25.972656 6.628906 27 8 27 L 24 27 C 24.359375 27.003906 24.695312 26.816406 24.878906 26.503906 C 25.058594 26.191406 25.058594 25.808594 24.878906 25.496094 C 24.695312 25.183594 24.359375 24.996094 24 25 L 8 25 C 7.433594 25 7 24.566406 7 24 C 7 23.433594 7.433594 23 8 23 L 23 23 C 24.105469 23 25 22.105469 25 21 L 25 5 C 25 3.894531 24.105469 3 23 3 Z M 12 9 L 19 9 C 19.550781 9 20 9.449219 20 10 C 20 10.550781 19.550781 11 19 11 L 12 11 C 11.449219 11 11 10.550781 11 10 C 11 9.449219 11.449219 9 12 9 Z M 12 9 " />
        </g>
      </SvgIcon>
    );
  }

  function LectureAddIcon(props: any) {
    return (
      <SvgIcon {...props} viewBox="0 0 30 30">
        <g id="surface36641340">
          <path d="M 23 3 C 24.105469 3 25 3.894531 25 5 L 25 14.535156 C 24.410156 14.195312 23.726562 14 23 14 C 20.792969 14 19 15.792969 19 18 L 19 19 L 18 19 C 15.792969 19 14 20.792969 14 23 L 8 23 C 7.433594 23 7 23.433594 7 24 C 7 24.566406 7.433594 25 8 25 L 14.535156 25 C 15.230469 26.195312 16.523438 27 18 27 L 8 27 C 6.628906 27 5.648438 25.972656 5.296875 24.707031 C 5.105469 24.519531 5 24.265625 5 24 L 5 6 C 5 4.34375 6.34375 3 8 3 Z M 11 10 C 11 10.550781 11.449219 11 12 11 L 19 11 C 19.550781 11 20 10.550781 20 10 C 20 9.449219 19.550781 9 19 9 L 12 9 C 11.449219 9 11 9.449219 11 10 Z M 11 10 " />
          <path d="M 30 23 C 30 24.105469 29.105469 25 28 25 L 25 25 L 25 28 C 25 29.105469 24.105469 30 23 30 C 21.894531 30 21 29.105469 21 28 L 21 25 L 18 25 C 16.894531 25 16 24.105469 16 23 C 16 21.894531 16.894531 21 18 21 L 21 21 L 21 18 C 21 16.894531 21.894531 16 23 16 C 24.105469 16 25 16.894531 25 18 L 25 21 L 28 21 C 29.105469 21 30 21.894531 30 23 Z M 30 23 " />
        </g>
      </SvgIcon>
    );
  }

  function LectureEditIcon(props: any) {
    return (
      <SvgIcon {...props} viewBox="0 0 30 30">
        <g id="surface35641004">
          <path d="M 23 3 C 24.105469 3 25 3.894531 25 5 L 25 14.003906 C 24.925781 14.003906 24.855469 14 24.78125 14 C 22.855469 14 21.050781 14.75 19.691406 16.109375 C 18.128906 17.671875 17.648438 19.609375 18.285156 21.585938 L 16.871094 23 L 8 23 C 7.433594 23 7 23.433594 7 24 C 7 24.566406 7.433594 25 8 25 L 14.917969 25 C 14.453125 25.597656 14.164062 26.285156 14.054688 27 L 8 27 C 6.628906 27 5.648438 25.972656 5.296875 24.710938 C 5.105469 24.519531 5 24.265625 5 24 L 5 6 C 5 4.34375 6.34375 3 8 3 Z M 11 10 C 11 10.550781 11.449219 11 12 11 L 19 11 C 19.550781 11 20 10.550781 20 10 C 20 9.449219 19.550781 9 19 9 L 12 9 C 11.449219 9 11 9.449219 11 10 Z M 11 10 " />
          <path d="M 28.480469 24.898438 C 27.035156 26.339844 25.484375 26.234375 23.976562 25.328125 C 22.367188 26.9375 20.121094 29.179688 19.988281 29.316406 C 19.078125 30.226562 17.597656 30.226562 16.6875 29.316406 C 15.773438 28.40625 15.773438 26.925781 16.6875 26.015625 C 16.824219 25.878906 19.101562 23.597656 20.675781 22.027344 C 19.769531 20.519531 19.664062 18.964844 21.105469 17.523438 C 22.605469 16.023438 24.792969 15.636719 26.65625 16.347656 L 23.503906 19.496094 L 24.003906 22 L 26.503906 22.5 L 29.65625 19.347656 C 30.367188 21.210938 29.980469 23.398438 28.480469 24.898438 Z M 28.480469 24.898438 " />
        </g>
      </SvgIcon>
    );
  }

  function UnitAddIcon(props: any) {
    return (
      <SvgIcon {...props} viewBox="0 0 30 30">
        <g id="surface36366488">
          <path d="M 7 2 L 23 2 C 24.105469 2 25 2.894531 25 4 L 25 14.535156 C 24.410156 14.195312 23.726562 14 23 14 C 21.804688 14 20.734375 14.523438 20 15.355469 C 19.589844 15.820312 19.285156 16.382812 19.125 17 L 14 17 C 13.449219 17 13 17.449219 13 18 C 13 18.550781 13.449219 19 14 19 L 18 19 C 16.523438 19 15.230469 19.804688 14.535156 21 L 14 21 C 13.449219 21 13 21.449219 13 22 C 13 22.550781 13.449219 23 14 23 C 14 25.207031 15.792969 27 18 27 L 19 27 L 19 28 L 7 28 C 5.894531 28 5 27.105469 5 26 L 5 4 C 5 2.894531 5.894531 2 7 2 Z M 10 23 C 10.550781 23 11 22.550781 11 22 C 11 21.449219 10.550781 21 10 21 C 9.449219 21 9 21.449219 9 22 C 9 22.550781 9.449219 23 10 23 Z M 14 15 L 20 15 C 20.550781 15 21 14.550781 21 14 C 21 13.449219 20.550781 13 20 13 L 14 13 C 13.449219 13 13 13.449219 13 14 C 13 14.550781 13.449219 15 14 15 Z M 10 9 L 20 9 C 20.550781 9 21 8.550781 21 8 C 21 7.449219 20.550781 7 20 7 L 10 7 C 9.449219 7 9 7.449219 9 8 C 9 8.550781 9.449219 9 10 9 Z M 10 15 C 10.550781 15 11 14.550781 11 14 C 11 13.449219 10.550781 13 10 13 C 9.449219 13 9 13.449219 9 14 C 9 14.550781 9.449219 15 10 15 Z M 10 19 C 10.550781 19 11 18.550781 11 18 C 11 17.449219 10.550781 17 10 17 C 9.449219 17 9 17.449219 9 18 C 9 18.550781 9.449219 19 10 19 Z M 10 19 " />
          <path d="M 30 23 C 30 24.105469 29.105469 25 28 25 L 25 25 L 25 28 C 25 29.105469 24.105469 30 23 30 C 21.894531 30 21 29.105469 21 28 L 21 25 L 18 25 C 16.894531 25 16 24.105469 16 23 C 16 21.894531 16.894531 21 18 21 L 21 21 L 21 18 C 21 16.894531 21.894531 16 23 16 C 24.105469 16 25 16.894531 25 18 L 25 21 L 28 21 C 29.105469 21 30 21.894531 30 23 Z M 30 23 " />
        </g>
      </SvgIcon>
    );
  }

  function UnitEditIcon(props: any) {
    return (
      <SvgIcon {...props} viewBox="0 0 30 30">
        <g id="surface36653196">
<path d="M 7 2 L 23 2 C 24.105469 2 25 2.894531 25 4 L 25 14.003906 C 24.925781 14.003906 24.855469 14 24.78125 14 C 22.855469 14 21.050781 14.75 19.691406 16.109375 C 19.40625 16.394531 19.15625 16.691406 18.945312 17 L 14 17 C 13.449219 17 13 17.449219 13 18 C 13 18.550781 13.449219 19 14 19 L 18.09375 19 C 17.972656 19.648438 17.984375 20.320312 18.128906 21 L 14 21 C 13.449219 21 13 21.449219 13 22 C 13 22.550781 13.449219 23 14 23 L 16.871094 23 L 15.273438 24.601562 C 14.339844 25.53125 13.921875 26.78125 14.015625 28 L 7 28 C 5.894531 28 5 27.105469 5 26 L 5 4 C 5 2.894531 5.894531 2 7 2 Z M 10 23 C 10.550781 23 11 22.550781 11 22 C 11 21.449219 10.550781 21 10 21 C 9.449219 21 9 21.449219 9 22 C 9 22.550781 9.449219 23 10 23 Z M 14 15 L 20 15 C 20.550781 15 21 14.550781 21 14 C 21 13.449219 20.550781 13 20 13 L 14 13 C 13.449219 13 13 13.449219 13 14 C 13 14.550781 13.449219 15 14 15 Z M 10 9 L 20 9 C 20.550781 9 21 8.550781 21 8 C 21 7.449219 20.550781 7 20 7 L 10 7 C 9.449219 7 9 7.449219 9 8 C 9 8.550781 9.449219 9 10 9 Z M 10 15 C 10.550781 15 11 14.550781 11 14 C 11 13.449219 10.550781 13 10 13 C 9.449219 13 9 13.449219 9 14 C 9 14.550781 9.449219 15 10 15 Z M 10 19 C 10.550781 19 11 18.550781 11 18 C 11 17.449219 10.550781 17 10 17 C 9.449219 17 9 17.449219 9 18 C 9 18.550781 9.449219 19 10 19 Z M 10 19 "/>
<path d="M 28.480469 24.898438 C 27.035156 26.339844 25.484375 26.234375 23.976562 25.328125 C 22.367188 26.9375 20.121094 29.179688 19.988281 29.316406 C 19.078125 30.226562 17.597656 30.226562 16.6875 29.316406 C 15.773438 28.40625 15.773438 26.925781 16.6875 26.015625 C 16.824219 25.878906 19.101562 23.597656 20.675781 22.027344 C 19.769531 20.519531 19.664062 18.964844 21.105469 17.523438 C 22.605469 16.023438 24.792969 15.636719 26.65625 16.347656 L 23.503906 19.496094 L 24.003906 22 L 26.503906 22.5 L 29.65625 19.347656 C 30.367188 21.210938 29.980469 23.398438 28.480469 24.898438 Z M 28.480469 24.898438 "/>
</g>
      </SvgIcon>
    );
  }

  function UnitIcon(props: any) {
    return (
      <SvgIcon {...props} viewBox="0 0 30 30">
        <g id="surface36653551">
<path d="M 5 4 L 5 26 C 5 27.105469 5.894531 28 7 28 L 23 28 C 24.105469 28 25 27.105469 25 26 L 25 4 C 25 2.894531 24.105469 2 23 2 L 7 2 C 5.894531 2 5 2.894531 5 4 Z M 13 22 C 13 21.449219 13.449219 21 14 21 L 20 21 C 20.550781 21 21 21.449219 21 22 C 21 22.550781 20.550781 23 20 23 L 14 23 C 13.449219 23 13 22.550781 13 22 Z M 9 22 C 9 21.449219 9.449219 21 10 21 C 10.550781 21 11 21.449219 11 22 C 11 22.550781 10.550781 23 10 23 C 9.449219 23 9 22.550781 9 22 Z M 13 18 C 13 17.449219 13.449219 17 14 17 L 20 17 C 20.550781 17 21 17.449219 21 18 C 21 18.550781 20.550781 19 20 19 L 14 19 C 13.449219 19 13 18.550781 13 18 Z M 13 14 C 13 13.449219 13.449219 13 14 13 L 20 13 C 20.550781 13 21 13.449219 21 14 C 21 14.550781 20.550781 15 20 15 L 14 15 C 13.449219 15 13 14.550781 13 14 Z M 9 8 C 9 7.449219 9.449219 7 10 7 L 20 7 C 20.550781 7 21 7.449219 21 8 C 21 8.550781 20.550781 9 20 9 L 10 9 C 9.449219 9 9 8.550781 9 8 Z M 9 14 C 9 13.449219 9.449219 13 10 13 C 10.550781 13 11 13.449219 11 14 C 11 14.550781 10.550781 15 10 15 C 9.449219 15 9 14.550781 9 14 Z M 9 18 C 9 17.449219 9.449219 17 10 17 C 10.550781 17 11 17.449219 11 18 C 11 18.550781 10.550781 19 10 19 C 9.449219 19 9 18.550781 9 18 Z M 9 18 "/>
</g>
      </SvgIcon>
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
      <Grid container spacing={2} alignContent='center'>
        <Grid item xs={7}>
        <img
        src={logoPath}
        alt="Learn with me logo"
        style={{ width: '100%'}}
      />
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item>
          <Typography variant="h4" style={{fontWeight:'bold'}}>
            Learn <br />
            With <br />
            Me
          </Typography>
        </Grid>
      </Grid>
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
                <LectureIcon/>
              </ListItemIcon>
              <ListItemText primary={lecture.short_title}/>
              {openLecture == lecture._id ? <ExpandLess/> : <ExpandMore/>}
            </ListItem>
            <Collapse
              in={openLecture == lecture._id}
              timeout="auto"
              unmountOnExit
              style={{marginLeft: 16}}
            >
              {user !== undefined && +user.role === Role.LECTURER && (
                <>
                  <ListItemLink
                    to={`${url}/lecture/${lecture._id}/edit`}
                    icon={<LectureEditIcon/>}
                    primary={`Edit ${lecture.short_title}`}
                  />
                  <ListItemLink
                    icon={<ShowChart/>}
                    primary="Statistics"
                    to={`${url}/lecture/${lecture._id}/statistics`}
                  />
                </>
              )}
              {lecture.units.map((unit) => (
                <>
                  <ListItem button onClick={() => setOpenUnit(unit._id)}>
                    <ListItemIcon>
                      <UnitIcon/>
                    </ListItemIcon>
                    <ListItemText primary={unit.title}/>
                    {openUnit == unit._id ? <ExpandLess/> : <ExpandMore/>}
                  </ListItem>
                  <Collapse
                    in={openUnit == unit._id}
                    timeout="auto"
                    unmountOnExit
                    style={{marginLeft: 16}}
                  >
                    {user !== undefined && +user.role === Role.LECTURER && (
                      <ListItemLink
                        to={`${url}/unit/${unit._id}/edit`}
                        icon={<UnitEditIcon/>}
                        primary={`Edit ${unit.title}`}
                      />
                    )}
                    {user !== undefined && +user.role == Role.STUDENT &&
                      <ListItemLink
                        to={`${url}/unit/${unit._id}/watch`}
                        icon={<OndemandVideo/>}
                        primary="Watch"
                      />
                    }
                    <ListItemLink
                      to={`${url}/unit/${unit._id}/questions`}
                      icon={<QuestionAnswer/>}
                      primary="Questions"
                    />
                    {user !== undefined && +user.role == Role.LECTURER &&
                      <ListItemLink
                        to={`${url}/unit/${unit._id}/quizzes`}
                        icon={<Assignment/>}
                        primary="Quizzes"
                      />
                    }
                  </Collapse>
                </>
              ))}
              {user !== undefined && +user.role === Role.LECTURER && (
                <ListItemLink
                  icon={<UnitAddIcon/>}
                  primary="Create Unit"
                  to={`${url}/lecture/${lecture._id}/unit/create`}
                />
              )}
            </Collapse>
          </>
        ))}
        {user !== undefined && +user.role === Role.LECTURER && (
          <ListItemLink
            icon={<LectureAddIcon />}
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
