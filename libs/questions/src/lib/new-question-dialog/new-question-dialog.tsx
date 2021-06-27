import {
  Button,
  Dialog, DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  TextField
} from '@material-ui/core';

/* eslint-disable-next-line */
export interface NewQuestionDialogProps {
  open: boolean;
  onClose: DialogProps['onClose'];
}

export function NewQuestionDialog(props: NewQuestionDialogProps) {
  return (
   <Dialog open={props.open} onClose={props.onClose}>
     <DialogTitle>Add your question</DialogTitle>
     <DialogContent>
       <DialogContentText>
         Enter your question here to attach it to the current timestamp in the video.
       </DialogContentText>
       <TextField autoFocus label='Question Title' required type='text' fullWidth/>
       <TextField
         label="Question Content"
         placeholder="What is you question?"
         multiline
         rows={4}
         fullWidth
         required
       />
     </DialogContent>
     <DialogActions>
       <Button onClick={props.onClose} color="primary">
         Cancel
       </Button>
       <Button onClick={props.onClose} color="primary">
         Submit
       </Button>
     </DialogActions>
   </Dialog>
  );
}

export default NewQuestionDialog;
