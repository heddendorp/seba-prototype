import {Grid, Paper, Typography,} from '@material-ui/core';
import {useParams} from 'react-router-dom';
import React, {createRef, useContext, useEffect, useState} from 'react';
import {LectureUnitService, QuizService, UserService} from '@seba/frontend/api-services';
import {LectureQuestions,} from '@seba/frontend/lecture/questions';
import {useStyles} from './style';
import {IQuiz, IUser} from '@seba/backend/models';
import Chat from './chat/chat';
import StudyGroup from './study-group/study-group';
import {SocketContext} from '@seba/frontend/context';
import SubmitQuizDialog from '../../../quizzes/src/lib/submit-quiz-dialog';

const BASE_API_URL = 'http://localhost:3333';

export enum SyncEvent {
  PLAY,
  PAUSE,
}

export interface LectureWatchProps {
}

type WatchLectureURLParams = { unit_id: string };

export function LectureWatch(props: LectureWatchProps) {
  const params = useParams<WatchLectureURLParams>();
  const classes = useStyles();
  const socket = useContext(SocketContext);

  // state to save the current study group
  const [currentStudyGroup, setCurrentStudyGroup] = useState<string>();
  const [quizOpen, setQuizOpen] = useState<boolean>(false);

  // reference of the video element
  const videoRef = createRef<HTMLVideoElement>();

  // effect to set up and close the socket for a studyGroup
  useEffect(() => {
    if (currentStudyGroup) {
      console.log(`Setting up socket for ${currentStudyGroup}`);
      socket.emit('groupConnect', currentStudyGroup);
    }
    socket.on('sync', (data: any) => {
      const video = document.getElementById("video_stream") as HTMLVideoElement;
      video.currentTime = data.currentTime;
      console.log(+data.syncEvent)
      switch (+data.syncEvent) {
        case SyncEvent.PLAY:
          video.play();
          break;
        case SyncEvent.PAUSE:
          video.pause();
          break;
        default:
          throw new Error('Not implemented');

      }
    });
    return () => {
      socket.off('sync');
    };
  }, [currentStudyGroup]);

  const [user, setUser] = useState<IUser>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoPath, setVideoPath] = useState('');
  const [quizzes, setQuizzes] = useState<[IQuiz]>();
  const [currentTime, setCurrentTime] = useState<number>();
  const [currentQuiz, setCurrentQuiz] = useState<IQuiz>();

  useEffect(() => {
    UserService.getCurrent().then((user) => setUser(user));

    LectureUnitService.getById(params.unit_id).then((unit) => {
      setTitle(unit.title);
      setDescription(unit.description);
      setVideoPath(BASE_API_URL + unit.video_path);
      setQuizzes(unit.quizzes as [IQuiz]);
    });
  }, [params.unit_id]);

  useEffect(() => {
    if (!quizzes || !currentTime || !videoRef.current) return;
    const comingQuiz = quizzes.find(
      (quiz) => Math.abs(quiz.timestamp - currentTime) < 1
    );
    if (comingQuiz && comingQuiz.questions.some(question => question.submissions.some(submission => user._id == submission.user))) {
      return;
    }
    if (comingQuiz) {
      videoRef.current.pause();
      setCurrentQuiz(comingQuiz);
      setQuizOpen(true);
    }
  }, [quizzes, currentTime]);

  function handleClickPlay() {
    socket.emit('sync', {
      group_id: currentStudyGroup,
      syncEvent: SyncEvent.PLAY,
      currentTime: (document.getElementById("video_stream") as HTMLVideoElement).currentTime
    });
  }

  function handleClickPause() {
    socket.emit('sync', {
      group_id: currentStudyGroup,
      syncEvent: SyncEvent.PAUSE,
      currentTime: (document.getElementById("video_stream") as HTMLVideoElement).currentTime
    });
  }

  function handleSubmitQuiz(answers: any) {
    if (currentQuiz) {
      QuizService.submitAnswers(currentQuiz._id, answers);
    }
    setQuizOpen(false);
  }

  return (
    <div style={{padding: 32}}>
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
                  onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
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
            <Paper
              variant="outlined"
              className={classes.padded}
              style={{height: '100%'}}
            >
              <Chat groupId={currentStudyGroup} socket={socket} user={user}/>
            </Paper>
          </Grid>
        </Grid>
        {currentQuiz && (
          <SubmitQuizDialog
            quiz={currentQuiz}
            open={quizOpen}
            handleClose={handleSubmitQuiz}
          />
        )}
        <Grid item container spacing={4} alignItems="stretch">
          <Grid item xs={8} container direction="column" spacing={2}>
            <Grid item>
              <Paper variant="outlined" className={classes.padded}>
                <LectureQuestions
                  lecureUnitId={params.unit_id}
                  currentTime={currentTime}
                />
              </Paper>
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
