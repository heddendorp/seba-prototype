import React, { useEffect, useReducer } from 'react';
import { Button, Grid } from '@material-ui/core';
import EditQuizDialog from './edit-quiz-dialog/edit-quiz-dialog';
import { ICreateQuizTransport, IQuizTransport } from '@seba/shared';
import { QuizService } from '@seba/frontend/api-services';
import QuizListEntry from './quiz-list-entry';
import { useParams } from 'react-router-dom';
import { useStyles } from './styles';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QuizListProps {
  timestamp: number;
  maxVideoLength: number;
}

const initialState: IQuizTransport[] = [];

function reducer(
  state: IQuizTransport[],
  action: { type: string; payload: IQuizTransport | any }
): IQuizTransport[] {
  switch (action.type) {
    case 'addQuiz': {
      return [action.payload, ...state];
    }
    case 'updateQuiz': {
      return [
        action.payload.quiz,
        ...state.filter((q) => q._id !== action.payload.oldId),
      ];
    }
    case 'deleteQuiz': {
      return state.filter((q) => q._id !== action.payload._id);
    }
    case 'setState': {
      return action.payload;
    }
  }
  return state;
}

type CreateQuizURLParams = {
  unit_id: string;
};

export function QuizList(props: QuizListProps) {
  const params = useParams<CreateQuizURLParams>();
  const [quizzes, dispatch] = useReducer(reducer, initialState);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    QuizService.getByUnitId(params.unit_id).then((quizzes) => {
      dispatch({ type: 'setState', payload: quizzes });
    });
  }, [params.unit_id]);

  const handleClose = (quiz?: ICreateQuizTransport | null) => {
    if (quiz != null) {
      quiz.unit_id = params.unit_id;
      QuizService.create(quiz).then((payload) => {
        //todo check if errer --> statsu != 200
        dispatch({ type: 'addQuiz', payload: payload });
      });
    }
    setOpen(false);
  };

  const handleEditQuiz = (quiz?: IQuizTransport) => {
    if (quiz != null) {
      QuizService.update(quiz._id, quiz).then((updatedQuiz) => {
        //todo check if errer --> statsu != 200
        dispatch({
          type: 'updateQuiz',
          payload: { oldId: quiz._id, quiz: updatedQuiz },
        });
      });
    }
  };

  const handleDeleteQuiz = (quiz: IQuizTransport) => {
    QuizService.delete(quiz._id as string).then((payload) => {
      //todo check if errer --> statsu != 200
      dispatch({ type: 'deleteQuiz', payload: payload });
    });
  };

  const classes = useStyles();

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setOpen(true)}
        className={classes.createQuizButton}
      >
        Create quiz
      </Button>
      <EditQuizDialog
        open={open}
        handleClose={handleClose}
        timestamp={props.timestamp}
        maxVideoDuration={props.maxVideoLength}
      />
      <Grid
        container
        spacing={1}
        direction="column"
        className={classes.sizingView}
      >
        {quizzes.map((quiz) => (
          <Grid item key={quiz._id}>
            <QuizListEntry
              quiz={quiz}
              handleEditQuiz={handleEditQuiz}
              handleDeleteQuiz={handleDeleteQuiz}
              maxVideoLength={props.maxVideoLength}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default QuizList;
