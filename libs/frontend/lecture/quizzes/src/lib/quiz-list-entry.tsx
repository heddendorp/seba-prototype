import {
  Avatar,
  Button,
  Checkbox,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  Paper,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useStyles } from './styles';
import React, { useState } from 'react';
import { IQuizQuestion } from '@seba/backend/models';
import { IQuizAnswer } from '@seba/backend/models';
import EditQuizDialog from './edit-quiz-dialog/edit-quiz-dialog';
import { IQuizTransport } from '@seba/shared';
import WatchLaterIcon from '@material-ui/icons/WatchLater';

/* eslint-disable-next-line */
export interface QuizListEntryProps {
  quiz: any;
  handleDeleteQuiz: (quiz: any) => void;
  handleEditQuiz: (quiz?: IQuizTransport) => void;
}

export function QuizListEntry(props: QuizListEntryProps) {
  const [open, setOpen] = React.useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const handleEditQuiz = (quiz: any) => {
    props.handleEditQuiz(quiz);
    setOpen(false);
  };

  const handleDelete = () => {
    props.handleDeleteQuiz(props.quiz);
    handleCloseDialog();
  };

  const classes = useStyles();

  const handleOpenDialog = () => setDeleteAlert(true);

  const handleCloseDialog = () => setDeleteAlert(false);

  function DeleteButton() {
    return (
      <div>
        <IconButton onClick={handleOpenDialog} className={classes.deleteButton}>
          <DeleteIcon />
        </IconButton>
        <Dialog
          open={deleteAlert}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete the quiz?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleting the quiz will be permanent and cannot be undone!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return (
    <>
      <EditQuizDialog
        quiz={props.quiz}
        open={open}
        handleClose={handleEditQuiz}
      />
      <Paper variant="outlined" className={classes.padded}>
        <Grid container justify="space-between">
          <Grid item>
            <Chip
              color="primary"
              size="medium"
              label={`Quiz is at: ${props.quiz.timestamp}s`}
              avatar={
                <Avatar>
                  <WatchLaterIcon />
                </Avatar>
              }
            />
          </Grid>
          <Grid item>
            <DeleteButton />
          </Grid>
        </Grid>
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
        <Button
          color="primary"
          variant="outlined"
          className={classes.editButton}
          onClick={() => setOpen(true)}
        >
          Edit Quiz
        </Button>
      </Paper>
    </>
  );
}

export default QuizListEntry;
