import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from '@material-ui/core';
import { QuestionService, UserService } from '@seba/frontend/api-services';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface AnswerQuestionDialogProps {
  onQuestionUpdate: (question: any) => void;
  question: any;
  open: boolean;
  newAnswerMode: boolean;
  onClose: () => void;
}

export function AnswerQuestionDialog(props: AnswerQuestionDialogProps) {
  // state containing the accepted answer
  const [acceptedAnswer, setAcceptedAnswer] = useState();

  // state for the current answer
  const [answer, setAnswer] = useState('');

  // state for the current user
  const [user, setUser] = useState();
  useEffect(() => {
    UserService.getCurrent().then((user) => setUser(user));
  }, []);

  // handle a submited answer
  const handleAnswer = async () => {
    const updatedQuestion = await QuestionService.addAnswer(
      props.question._id,
      answer
    );
    setAnswer('');
    props.onQuestionUpdate(updatedQuestion);
  };

  // handle an accepted answer
  const handleAcceptedAnswer = async (answerId) => {
    const updatedQuestion = await QuestionService.acceptAnswer(
      props.question._id,
      answerId
    );
    props.onQuestionUpdate(updatedQuestion);
  }

  // effect to update the accepted answer
  useEffect(() => {
    if (
      props.question.answers.length > 0 &&
      !!props.question.answers.find((answer) => answer.markedAsCorrect)
    ) {
      setAcceptedAnswer(
        props.question.answers.find((answer) => answer.markedAsCorrect)
      );
    } else {
      setAcceptedAnswer(undefined);
    }
  }, [props.question]);
  return (
    <Dialog open={props.open} onClose={() => props.onClose()}>
      <DialogTitle>{props.question.title}</DialogTitle>
      <DialogContent style={{ minHeight: '40vh', minWidth: '40vh' }}>
        <p>{props.question.text}</p>
        <Divider />
        { acceptedAnswer && (
          <>
          <Typography variant="h6" component="p" color="primary">
              Accepted Answer
            </Typography>
            <p>
              {acceptedAnswer.text}
            </p>
            <Divider />
          </>
        )}
        {props.question.answers.filter(answer => !answer.markedAsCorrect).map((answer) => (
          <div key={answer._id}>
            <Typography variant="h6" component="p">
              {answer.author.display_name} answered
            </Typography>
            <p>{answer.text}</p>
            { !props.question.isAnswered && props.question.author._id == user?._id && (
              <Button color="primary" onClick={()=>{handleAcceptedAnswer(answer._id)}}>Accept this answer</Button>
            )}
            <Divider />
          </div>
        ))}
        {props.newAnswerMode && (
          <>
            <Divider style={{ marginBottom: 16 }} />
            <Typography variant="subtitle1" component="p">
              Add your answer
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your answer"
              variant="outlined"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
            />
            <Button onClick={handleAnswer}>Submit answer</Button>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AnswerQuestionDialog;
