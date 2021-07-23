import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  TextField
} from '@material-ui/core';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface NewQuestionDialogProps {
  open: boolean;
  timestamp: number;
  onClose: (question: any) => DialogProps['onClose'];
}

export function NewQuestionDialog(props: NewQuestionDialogProps) {
  const [question, setQuestion] = useState<any>([]);
  useEffect(() => {
    setQuestion({timestamp: props.timestamp});
  }, [props.timestamp]);
  return (
    <Dialog open={props.open} onClose={props.onClose(null)}>
      <DialogTitle>Add your question</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your question here to attach it to {props.timestamp} second mark in the video.
        </DialogContentText>
        <TextField autoFocus label='Question Title' required type='text' fullWidth
                   onChange={e => setQuestion({ ...question, title: e.target.value })} />
        <TextField
          label='Question Content'
          placeholder='What is you question?'
          multiline
          rows={4}
          fullWidth
          required
          onChange={e => setQuestion({ ...question, text: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose(null)} color='primary'>
          Cancel
        </Button>
        <Button onClick={props.onClose(question)} color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewQuestionDialog;
