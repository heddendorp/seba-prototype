import React from 'react';
import { Button, Grid, Paper } from '@material-ui/core';
import NewQuestionDialog from '../new-question-dialog/new-question-dialog';
import { QuestionService } from '@seba/frontend/api-services';

/* eslint-disable-next-line */
export interface AddQuesionTriggerProps {
  videoReference: any;
  lecureUnitId: string;
  onNewQuestion: (question: any) => void;
}

export function AddQuesionTrigger(props: AddQuesionTriggerProps) {
  // react state to save the open property
  const [open, setOpen] = React.useState(false);
  // state to save the current timestamp
  const [timestamp, setTimestamp] = React.useState(0);

  // click handler to open the dialog
  const handleClick = () => {
    setTimestamp(Math.round(props.videoReference.current.currentTime));
    setOpen(true);
  };

  // handler that takes a question and closes the dialog
  const handleClose = (question: any) => {
    return () => {
      if (question) {
        QuestionService.create(question, props.lecureUnitId).then(
          (question) => {
            props.onNewQuestion(question);
            setOpen(false);
          }
        );
      } else {
        setOpen(false);
      }
    };
  };

  return (
    <>
      <Grid container>
        <Grid item xs>
          <p>
            If you have a question at this point in the lecture you can ask it
            here
          </p>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Ask a question
          </Button>
        </Grid>
      </Grid>
      <NewQuestionDialog
        open={open}
        onClose={handleClose}
        timestamp={timestamp}
      />
    </>
  );
}

export default AddQuesionTrigger;
