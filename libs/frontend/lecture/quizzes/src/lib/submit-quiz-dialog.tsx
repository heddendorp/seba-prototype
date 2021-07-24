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
import {IQuiz, IQuizAnswer, IQuizQuestion} from '@seba/backend/models';
import React, {useState} from 'react';
import {useStyles} from './styles';

export interface SubmitQuizDialogProps {
  quiz: IQuiz;
  open: boolean;
  handleClose: (answers: {}) => void;
}

export function SubmitQuizDialog(props: SubmitQuizDialogProps) {
  const [answers, setAnswers] = useState({});

  const classes = useStyles();

  const updateAnswer = (questionId, answer: IQuizAnswer, checked: boolean) => {
    setAnswers((state) => {
      if (!checked) {
        const newState = {...state}
        delete newState[questionId][answer._id]
        return newState;
      }
      return {...state, [questionId]: {...state[questionId], [answer._id]: answer,},};
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
                <FormLabel>{question.question}</FormLabel>
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
            props.handleClose(answers);
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
