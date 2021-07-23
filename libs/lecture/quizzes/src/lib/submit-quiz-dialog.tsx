import {
  Button,
  Checkbox, Dialog, DialogActions, DialogContent,
  DialogProps, DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper, TextField
} from "@material-ui/core";
import {IQuiz, IQuizAnswer, IQuizQuestion, User} from "@seba/models";
import React, {useEffect, useState} from "react";
import {useStyles} from "./styles";
import {IQuizTransport} from "@seba/api-interfaces";


export interface SubmitQuizDialogProps {
  quiz: IQuiz
  open: boolean;
  //onClose: (question: any) => DialogProps['onClose'];
  handleClose: (answers: IQuizAnswer[]) => void;
}

export function SubmitQuizDialog(props: SubmitQuizDialogProps) {

  const [answers, setAnswers] = useState({});

  const classes = useStyles();

  useEffect(() => console.log(answers), [answers]);

  const updateAnswer = (questionId, answerId, checked: boolean) => {
    setAnswers((state) => {
      return {
        ...state,
        [questionId]: {
          ...state[questionId],
          [answerId]: checked
        }
      }
    })
  }

  return (
    <Paper variant="outlined" className={classes.padded}>
      <Dialog open={props.open}>
        <DialogTitle>Quiz</DialogTitle>
        <DialogContent>


          <FormControl>
            <Grid container spacing={1} direction="column">
              {
                props.quiz.questions.map((question: IQuizQuestion) => (
                  <Grid item key={question._id}>
                    <FormLabel>{question.question}</FormLabel>
                    <FormGroup>
                      {
                        question.answers.map((answer: IQuizAnswer) => {
                          return (
                            <FormControlLabel key={answer._id}
                                              control={<Checkbox
                                                onChange={(e) => updateAnswer(question._id, answer._id, e.target.checked)}/>}
                                              label={answer.answer}
                            />);
                        })
                      }
                    </FormGroup>
                  </Grid>
                ))
              }
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
    </Paper>
  );
}

export default SubmitQuizDialog;
