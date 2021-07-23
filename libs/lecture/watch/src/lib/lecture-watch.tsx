import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { LectureUnitService, UserService } from '@seba/api-services';
import AddIcon from '@material-ui/icons/Add';
import { AddQuesionTrigger } from '@seba/questions';
import { useStyles } from './style';
import { IUser, Role } from '@seba/models';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import Chat from './chat/chat';
import StudyGroup from './study-group/study-group';
import { SocketContext } from '@seba/context';
import { createRef } from 'react';

const BASE_API_URL = 'http://localhost:3333';

export enum SyncEvent {
  PLAY,
  PAUSE,
}

export interface LectureWatchProps {}

type WatchLectureURLParams = { unit_id: string };

export function LectureWatch(props: LectureWatchProps) {
  const params = useParams<WatchLectureURLParams>();
  const classes = useStyles();
  const socket = useContext(SocketContext);

  // state to save the current study group
  const [currentStudyGroup, setCurrentStudyGroup] = useState<string>();

  // effect to set up and close the socket for a studyGroup
  useEffect(() => {
    if (currentStudyGroup) {
      console.log(`Setting up socket for ${currentStudyGroup}`);
      socket.emit('groupConnect', currentStudyGroup);
    }
    socket.on('sync', (syncEvent: SyncEvent) => {
      console.info(syncEvent);
    if (videoRef.current) {
      switch (+syncEvent) {
        case SyncEvent.PLAY:
          videoRef.current.play();
          break;
        case SyncEvent.PAUSE:
          videoRef.current.pause();
          break;
        default:
          throw new Error('Not implemented');
      }
    }
    })
    return () => {
      socket.off('sync');
    }	
  }, [currentStudyGroup]);

  // reference of the video element
  const videoRef = createRef<HTMLVideoElement>();

  const [user, setUser] = useState<IUser>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoPath, setVideoPath] = useState('');


  useEffect(() => {
    UserService.getCurrent().then((user) => setUser(user));

    LectureUnitService.getById(params.unit_id).then((unit) => {
      setTitle(unit.title);
      setDescription(unit.description);
      setVideoPath(BASE_API_URL + unit.video_path);
    });
  }, [params.unit_id]);

  function handleClickPlay() {
    socket.emit('sync',{group_id: currentStudyGroup, syncEvent: SyncEvent.PLAY});
  }

  function handleClickPause() {
    socket.emit('sync',{group_id: currentStudyGroup, syncEvent: SyncEvent.PAUSE});
  }

  return (
    <div style={{ padding: 32 }}>
      <Grid container spacing={4} direction="column">
        <Grid item>
          <Typography variant="h2" component="h1">
            Watch: {title}
          </Typography>
        </Grid>
        <Grid item container spacing={4} alignItems="stretch">
          <Grid item xs={8} container direction="column" spacing={2}>
            <Grid item>
              <Paper variant="outlined" className={classes.hideOverflow}>
                <video
                  id="video_stream"
                  controls
                  width="100%"
                  ref={videoRef}
                  src={videoPath}
                  onPause={handleClickPause}
                  onPlay={handleClickPlay}
                >
                  Your browser does not support this video type.
                </video>
              </Paper>
            </Grid>
            <Grid item>
              <Paper variant="outlined" className={classes.padded}>
                <Typography variant="h4" component="h2">
                  {description}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs>
            <Paper variant="outlined" className={classes.padded} style={{height:'100%'}}>
              <Chat groupId={currentStudyGroup} socket={socket} user={user} />
            </Paper>
          </Grid>
        </Grid>
        <Grid item container spacing={4} alignItems="stretch">
          <Grid item xs={8} container direction="column" spacing={2}>
            <Grid item>
              <Paper variant="outlined" className={classes.padded}></Paper>
            </Grid>
          </Grid>
          <Grid item xs>
            <Paper variant="outlined" className={classes.padded}>
              <StudyGroup
                user={user}
                studyGroupId={currentStudyGroup}
                onStudyGroupChange={(id) => setCurrentStudyGroup(id)}
              />
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default LectureWatch;
