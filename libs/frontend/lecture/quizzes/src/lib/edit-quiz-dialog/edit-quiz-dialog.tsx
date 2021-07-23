import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  TextField,
} from '@material-ui/core';
import React, { useEffect, useReducer, useState } from 'react';
import { ICreateQuizTransport, IQuizTransport } from '@seba/shared';
import { useStyles } from '../styles';

/* eslint-disable-next-line */
export interface EditQuizDialogProps {
  quiz?: any;
  open: boolean;
  handleClose: (quiz?: IQuizTransport | null) => void;
}

const emptyAnswer = { answer: '', isCorrect: false };
const emptyQuestion = { question: '', answers: [{ ...emptyAnswer }] };
const emptyQuiz = {
  unit_id: '',
  timestamp: 6,
  questions: [{ ...emptyQuestion }],
};

//function reducer(state: IQuiz, action: {type: string; payload: IQuiz}): IQuiz {
function reducer(state: ICreateQuizTransport, action) {
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
    <Dialog open={props.open}>
      <DialogTitle>Edit the quiz</DialogTitle>
      <DialogContent>
        <Button onClick={() => dispatch({ type: 'addQuestion' })}>
          AddQuestion
        </Button>
        {quiz.questions.map((question, questionIndex) => (
          <>
            <Button
              onClick={() =>
                dispatch({ type: 'removeQuestion', payload: { questionIndex } })
              }
              disabled={quiz.questions.length === 1}
            >
              delete
            </Button>
            <TextField
              key={questionIndex}
              label={`Question ${questionIndex + 1}`}
              placeholder="Question content"
              fullWidth
              required
              value={question.question}
              onChange={(e) =>
                dispatch({
                  type: 'updateQuestion',
                  payload: { questionIndex, text: e.target.value },
                })
              }
            />
            {question.answers.map((answer, answerIndex) => (
              <>
                <Grid container>
                  <Grid item>
                    <TextField
                      key={answerIndex}
                      label={`Answer ${answerIndex + 1}`}
                      placeholder="Answer content"
                      fullWidth
                      required
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
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
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
                      }
                      label="Is correct"
                    />
                  </Grid>
                </Grid>
                <Button
                  onClick={() =>
                    dispatch({
                      type: 'removeAnswer',
                      payload: { questionIndex, answerIndex },
                    })
                  }
                  disabled={question.answers.length === 1}
                >
                  Delete Answer
                </Button>
              </>
            ))}
            <Button
              onClick={() =>
                dispatch({ type: 'addAnswer', payload: { questionIndex } })
              }
            >
              Add Answer
            </Button>
          </>
        ))}
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
