import {
  Button,
  Checkbox,
  createStyles,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Theme,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from './styles';
import React, { useState } from 'react';
import { IQuizQuestion } from '../../../../models/src/lib/quiz-question';
import { IQuizAnswer } from '@seba/backend/models';
import EditQuizDialog from './edit-quiz-dialog/edit-quiz-dialog';
import { IQuizTransport } from '@seba/shared';

/* eslint-disable-next-line */
export interface QuizListEntryProps {
  quiz: any;
  handleDeleteQuiz: (quiz: any) => void;
  handleEditQuiz: (quiz?: IQuizTransport | null) => void;
}

export function QuizListEntry(props: QuizListEntryProps) {
  const [open, setOpen] = React.useState(false);

  const handleEditQuiz = (quiz: any) => {
    props.handleEditQuiz(quiz);
    setOpen(false);
  };

  const handleDelete = () => {
    props.handleDeleteQuiz(props.quiz);
  };

  const classes = useStyles();
  return (
    <>
      <EditQuizDialog
        quiz={props.quiz}
        open={open}
        handleClose={handleEditQuiz}
      />
      <Paper variant="outlined" className={classes.padded}>
        <FormLabel>Timestamp: 00:00:00</FormLabel>
        <Button onClick={() => setOpen(true)}>Edit</Button>
        <IconButton className={classes.dButton} onClick={handleDelete}>
          <CloseIcon />
        </IconButton>
        <Paper variant="outlined" className={classes.padded}>
          <FormControl>
            <Grid container spacing={1} direction="column">
              {props.quiz.questions.map((question: IQuizQuestion) => (
                <Grid item key={question._id}>
                  <FormLabel>{question.question}</FormLabel>
                  <FormGroup>
                    {question.answers.map((answer: IQuizAnswer) => {
                      return (
                        //icons?
                        <FormControlLabel
                          key={answer._id}
                          control={
                            <Checkbox
                              checked={answer.isCorrect}
                              disabled={true}
                            />
                          }
                          label={answer.answer}
                        />
                      );
                    })}
                  </FormGroup>
                </Grid>
              ))}
              <FormLabel>*Correct answers are marked</FormLabel>
            </Grid>
          </FormControl>
        </Paper>
      </Paper>
    </>
  );
}

export default QuizListEntry;
