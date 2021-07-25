import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import React, { createRef, useContext, useEffect, useState } from 'react';
import {
  LectureUnitService,
  QuizService,
  StudyGroupService,
  UserService,
} from '@seba/frontend/api-services';
import { LectureQuestions } from '@seba/frontend/lecture/questions';
import { useStyles } from './style';
import { IQuiz, IUser } from '@seba/backend/models';
import Chat from './chat/chat';
import StudyGroup from './study-group/study-group';
import { SocketContext } from '@seba/frontend/context';
import SubmitQuizDialog from '../../../quizzes/src/lib/submit-quiz-dialog';
import Dialog from '@material-ui/core/Dialog/Dialog';

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
  const [studyGroup, setStudyGroup] = useState<any>();
  const [quizOpen, setQuizOpen] = useState<boolean>(false);
  const [wrongGroupIdOpen, setWrongGroupIdOpen] = useState<boolean>(false);
  const [privateStatus, setPrivateStatus] = useState(false);

  // reference of the video element
  const videoRef = createRef<HTMLVideoElement>();

  // effect to set up and close the socket for a studyGroup
  useEffect(() => {
    socket.on('update', (data: any) => setPrivateStatus(data.privateStatus));

    socket.on('sync', (data: any) => {
      const video = document.getElementById('video_stream') as HTMLVideoElement;
      video.currentTime = data.currentTime;
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
      socket.off('update');
      socket.off('sync');
    };
  }, [currentStudyGroup]);

  const joinStudyGroup = (groupId: string) => {
    socket.emit('groupConnect', groupId, (group: any) => {
      if (!group) {
        setWrongGroupIdOpen(true);
        setStudyGroup(undefined);
        setCurrentStudyGroup(undefined);
      } else {
        setStudyGroup(group);
        setCurrentStudyGroup(groupId);
      }
    });
  };

  const [user, setUser] = useState<IUser>();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [videoPath, setVideoPath] = useState('');
  const [quizzes, setQuizzes] = useState<IQuiz[]>([]);
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
      (quiz) => Math.abs(quiz.timestamp - currentTime) < 0.3
    );
    //check if the user has already done the quiz
    if (
      comingQuiz &&
      comingQuiz.questions.some((question) =>
        question.submissions.some((submission) => user._id == submission.user)
      )
    ) {
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
      currentTime: (document.getElementById('video_stream') as HTMLVideoElement)
        .currentTime,
    });
  }

  function handleClickPause() {
    socket.emit('sync', {
      group_id: currentStudyGroup,
      syncEvent: SyncEvent.PAUSE,
      currentTime: (document.getElementById('video_stream') as HTMLVideoElement)
        .currentTime,
    });
  }

  function handleSubmitQuiz(answers?: any) {
    //if the user submitted answer
    if(answers) {
      if (currentQuiz) {
        QuizService.submitAnswers(currentQuiz._id, answers).then(
          (updatedQuiz) => {
            setQuizzes((oldQuizzes) => [
              updatedQuiz,
              ...oldQuizzes.filter((q) => q._id != updatedQuiz._id),
            ]);
          }
        );
      }
    } else {
      //skip the duration of the quiz
      (document.getElementById('video_stream') as HTMLVideoElement).currentTime = currentTime + 0.8;
    }
    setQuizOpen(false);
  }

  return (
    <div className={classes.grid}>
      <Typography style={{ gridArea: 'title' }} variant="h3" component="h1">
        Watch: {title}
      </Typography>
      <Paper
        style={{ gridArea: 'video' }}
        variant="outlined"
        className={classes.hideOverflow}
      >
        <video
          style={{
            display: 'block',
          }}
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
      <Paper
        style={{ gridArea: 'description' }}
        variant="outlined"
        className={classes.padded}
      >
        <Typography variant="h5" component="h2">
          {description}
        </Typography>
      </Paper>
      <Paper
        style={{ gridArea: 'chat' }}
        variant="outlined"
        className={classes.padded}
      >
        <Chat
          group={studyGroup}
          groupId={currentStudyGroup}
          socket={socket}
          user={user}
        />
      </Paper>
      {currentQuiz && (
        <SubmitQuizDialog
          quiz={currentQuiz}
          open={quizOpen}
          handleClose={handleSubmitQuiz}
        />
      )}

      <Paper
        style={{ gridArea: 'questions' }}
        variant="outlined"
        className={classes.padded}
      >
        <LectureQuestions
          lecureUnitId={params.unit_id}
          currentTime={currentTime}
        />
      </Paper>

      <Paper
        style={{ gridArea: 'group' }}
        variant="outlined"
        className={classes.padded}
      >
        <StudyGroup
          user={user}
          studyGroupId={currentStudyGroup}
          unitId={params.unit_id}
          onStudyGroupChange={(id) => joinStudyGroup(id)}
          privateStatus={privateStatus}
          setPrivateStatus={(privateStatus: boolean) => {
            socket.emit('update', {
              group_id: currentStudyGroup,
              privateStatus: privateStatus,
            });
            setPrivateStatus(privateStatus);
          }}
        />
        <Dialog
          open={wrongGroupIdOpen}
          onClose={() => setWrongGroupIdOpen(false)}
        >
          <DialogTitle>Study group not found</DialogTitle>
          <DialogContent>
            The Group ID you entered does not seem to exist, please try again
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setWrongGroupIdOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </div>
  );
}

export default LectureWatch;
