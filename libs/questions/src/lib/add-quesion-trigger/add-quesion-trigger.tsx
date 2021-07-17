import React from "react";
import { Button, Grid, Paper } from '@material-ui/core';
import NewQuestionDialog from "../new-question-dialog/new-question-dialog";

/* eslint-disable-next-line */
export interface AddQuesionTriggerProps {}

export function AddQuesionTrigger(props: AddQuesionTriggerProps) {
  // react state to save the open property
  const [open, setOpen] = React.useState(false);

  // click handler to open the dialog
  const handleClick = () => {
    setOpen(true);
  };

  // handler that takes a question and closes the dialog
  const handleClose = (question: any) => {
    return () =>{
      console.log(question);
      setOpen(false);
    };
  };

  return (
    <>
    <Paper variant={'outlined'}>
      <Grid container>
        <Grid item xs>
          <p>If you have a question at this point in the lecture you can ask it here</p>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleClick}>Ask a question</Button>
        </Grid>
      </Grid>
    </Paper>
    <NewQuestionDialog open={open} onClose={handleClose} />
    </>
  );
}

export default AddQuesionTrigger;
