import {
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { QuestionService } from '@seba/frontend/api-services';

/* eslint-disable-next-line */
export interface QuestionListEntryProps {
  question: any;
  onQuestionUpdate: (question: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(3),
    },
  })
);

export function QuestionListEntry(props: QuestionListEntryProps) {
  const classes = useStyles();
  const upvote = () => {
    QuestionService.upvote(props.question._id).then((question) =>
      props.onQuestionUpdate(question)
    );
  };
  return (
    <Grid container alignItems="stretch">
      <Grid item xs container justify="space-around" direction="column">
        <Grid item container alignItems="center" spacing={2}>
          <IconButton onClick={upvote}>
            <ThumbUpIcon />
          </IconButton>{' '}
          <span>{props.question.upVotes.length}</span>
        </Grid>
        <Grid item>
          <RadioButtonUncheckedIcon />
        </Grid>
      </Grid>
      <Grid item xs={11}>
        <h1>{props.question.title}</h1>
        <p>{props.question.text}</p>
      </Grid>
    </Grid>
  );
}

export default QuestionListEntry;
