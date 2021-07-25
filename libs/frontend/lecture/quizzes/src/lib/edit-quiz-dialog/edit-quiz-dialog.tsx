import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  OutlinedInput,
  Tooltip,
} from '@material-ui/core';
import React, { useReducer } from 'react';
import { ICreateQuizTransport, IQuizTransport } from '@seba/shared';
import { useStyles } from '../styles';
import { IQuizQuestion } from '@seba/backend/models';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import DeleteIcon from '@material-ui/icons/Delete';

/* eslint-disable-next-line */
export interface EditQuizDialogProps {
  quiz?: any;
  open: boolean;
  handleClose: (quiz?: IQuizTransport | null) => void;
  timestamp?: number; //todo
}

const emptyAnswer = { answer: '', isCorrect: false };
const emptyQuestion = {
  question: '',
  answers: [{ ...emptyAnswer }, { ...emptyAnswer }],
};
const emptyQuiz = {
  unit_id: '',
  timestamp: 0,
  questions: [{ ...emptyQuestion }],
};

function reducer(
  state: ICreateQuizTransport,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case 'reset': {
      return action.payload ? { ...action.payload } : { ...emptyQuiz };
    }
    case 'addQuestion': {
      return {
        ...state,
        questions: [...state.questions, { ...emptyQuestion }],
      };
    }
    case 'updateQuestion': {
      return {
        ...state,
        questions: Object.assign([], state.questions, {
          [action.payload.questionIndex]: {
            ...state.questions[action.payload.questionIndex],
            question: action.payload.text,
          },
        }),
      };
    }
    case 'removeQuestion': {
      return {
        ...state,
        questions: [
          ...state.questions.slice(0, action.payload.questionIndex),
          ...state.questions.slice(action.payload.questionIndex + 1),
        ],
      };
    }
    case 'addAnswer': {
      return {
        ...state,
        questions: Object.assign([], state.questions, {
          [action.payload.questionIndex]: {
            ...state.questions[action.payload.questionIndex],
            answers: [
              ...state.questions[action.payload.questionIndex].answers,
              { ...emptyAnswer },
            ],
          },
        }),
      };
    }
    case 'updateAnswer': {
      return {
        ...state,
        questions: Object.assign([], state.questions, {
          [action.payload.questionIndex]: {
            ...state.questions[action.payload.questionIndex],
            answers: Object.assign(
              [],
              state.questions[action.payload.questionIndex].answers,
              {
                [action.payload.answerIndex]: {
                  ...state.questions[action.payload.questionIndex].answers[
                    action.payload.answerIndex
                  ],
                  ...action.payload.update,
                },
              }
            ),
          },
        }),
      };
    }
    case 'removeAnswer': {
      return {
        ...state,
        questions: Object.assign([], state.questions, {
          [action.payload.questionIndex]: {
            ...state.questions[action.payload.questionIndex],
            answers: [
              ...state.questions[action.payload.questionIndex].answers.slice(
                0,
                action.payload.answerIndex
              ),
              ...state.questions[action.payload.questionIndex].answers.slice(
                action.payload.answerIndex + 1
              ),
            ],
          },
        }),
      };
    }
  }
}

export function EditQuizDialog(props: EditQuizDialogProps) {
  const [quiz, dispatch] = useReducer(reducer, props.quiz ?? { ...emptyQuiz });

  const classes = useStyles();

  return (
    <Dialog open={props.open} classes={{ paper: classes.questionDialog }}>
      <DialogTitle>{!props.quiz ? 'Create new quiz' : 'Edit quiz'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {!props.quiz
            ? `Quiz will be created at: ${props.timestamp}`
            : `Quiz at: ${props.timestamp}`}
        </DialogContentText>
        {quiz.questions.map(
          (question: IQuizQuestion, questionIndex: number) => (
            <Paper variant="outlined" className={classes.paper}>
              <Grid container style={{ gridGap: 10 }}>
                <TextField
                  InputProps={{ className: classes.questionInput }}
                  variant="outlined"
                  key={questionIndex}
                  placeholder="Enter a question..."
                  fullWidth
                  multiline
                  value={question.question}
                  onChange={(e) =>
                    dispatch({
                      type: 'updateQuestion',
                      payload: { questionIndex, text: e.target.value },
                    })
                  }
                />
                {question.answers.map((answer, answerIndex) => (
                  <Grid item container direction="row">
                    <Grid item className={classes.answerContent} xs={1}>
                      <Tooltip title="Mark correct option">
                        <Checkbox
                          icon={
                            <CircleUnchecked
                              style={{ color: 'white', fontSize: 35 }}
                            />
                          }
                          checkedIcon={
                            <CircleCheckedFilled
                              style={{ color: 'white', fontSize: 35 }}
                            />
                          }
                          checked={answer.isCorrect}
                          onChange={(e) =>
                            dispatch({
                              type: 'updateAnswer',
                              payload: {
                                questionIndex,
                                answerIndex,
                                update: { isCorrect: e.target.checked },
                              },
                            })
                          }
                        />
                      </Tooltip>
                    </Grid>
                    <Grid item xs={11}>
                      <OutlinedInput
                        key={answerIndex}
                        placeholder={`Answer option ${answerIndex + 1}`}
                        fullWidth
                        multiline
                        className={classes.questionInput}
                        value={answer.answer}
                        onChange={(e) =>
                          dispatch({
                            type: 'updateAnswer',
                            payload: {
                              questionIndex,
                              answerIndex,
                              update: { answer: e.target.value },
                            },
                          })
                        }
                        endAdornment={
                          question.answers.length > 2 && (
                            <InputAdornment position="end">
                              <Tooltip title="Delete option">
                                <IconButton
                                  onClick={() =>
                                    dispatch({
                                      type: 'removeAnswer',
                                      payload: { questionIndex, answerIndex },
                                    })
                                  }
                                >
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </InputAdornment>
                          )
                        }
                      />
                    </Grid>
                  </Grid>
                ))}
                <Grid
                  container
                  justify="space-between"
                  className={classes.modifyButtons}
                >
                  <Grid item>
                    <Button
                      onClick={() =>
                        dispatch({
                          type: 'addAnswer',
                          payload: { questionIndex },
                        })
                      }
                      className={classes.modifyButton}
                      variant="outlined"
                    >
                      Add Answer
                    </Button>
                  </Grid>
                  <Grid item>
                    {quiz.questions.length > 1 && (
                      <Button
                        onClick={() =>
                          dispatch({
                            type: 'removeQuestion',
                            payload: { questionIndex },
                          })
                        }
                        className={classes.modifyButton}
                        variant="outlined"
                      >
                        Delete Question
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          )
        )}
        <Button
          variant="outlined"
          onClick={() => dispatch({ type: 'addQuestion', payload: null })}
        >
          Add Question
        </Button>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.handleClose(null);
            dispatch({ type: 'reset', payload: props.quiz });
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.handleClose(quiz);
            dispatch({ type: 'reset', payload: props.quiz });
          }}
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditQuizDialog;
