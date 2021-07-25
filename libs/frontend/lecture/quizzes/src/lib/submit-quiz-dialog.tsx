import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
} from '@material-ui/core';
import { IQuiz, IQuizAnswer, IQuizQuestion } from '@seba/backend/models';
import React, { useState } from 'react';
import { useStyles } from './styles';
import CircleUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import CircleCheckedFilled from "@material-ui/icons/CheckCircle";

export interface SubmitQuizDialogProps {
  quiz: IQuiz;
  open: boolean;
  handleClose: (answers: any) => void;
}

export function SubmitQuizDialog(props: SubmitQuizDialogProps) {
  const [answers, setAnswers] = useState<any>({});

  const classes = useStyles();

  const updateAnswer = (
    questionId: string,
    answer: IQuizAnswer,
    checked: boolean
  ) => {
    setAnswers((state: any) => {
      if (!checked) {
        const newState = { ...state };
        delete newState[questionId][answer._id];
        return newState;
      }
      return {
        ...state,
        [questionId]: { ...state[questionId], [answer._id]: answer },
      };
    });
  };

  return (
    <Dialog open={props.open}>
      <DialogTitle>Quiz</DialogTitle>
      <DialogContent>
        <FormControl>
          <Grid container spacing={1} direction="column">
            {props.quiz.questions.map((question: IQuizQuestion) => (
              <Grid item key={question._id}>
                <label className={classes.questionText}>{question.question}</label>
                <FormGroup>
                  {question.answers.map((answer: IQuizAnswer) => {
                    return (
                      <FormControlLabel
                        key={answer._id}
                        control={
                          <Checkbox
                            onChange={(e) =>
                              updateAnswer(
                                question._id,
                                answer,
                                e.target.checked
                              )
                            }
                            className={classes.displayedQuizCheckbox}
                            icon={ <CircleUnchecked style={{ color: '#00796b' }}/> }
                            checkedIcon={ <CircleCheckedFilled style={{ color: '#00796b'}}/> }
                          />
                        }
                        label={answer.answer}
                      />
                    );
                  })}
                </FormGroup>
              </Grid>
            ))}
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            props.handleClose(null);
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.handleClose(answers);
          }}
          color="primary"
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SubmitQuizDialog;
