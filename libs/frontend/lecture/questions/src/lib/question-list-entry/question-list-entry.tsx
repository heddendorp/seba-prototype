import {
  Button,
  Chip,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { QuestionService } from '@seba/frontend/api-services';
import { Question } from '@seba/backend/models';

/* eslint-disable-next-line */
export interface QuestionListEntryProps {
  question: any;
  onQuestionUpdate: (question: any) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      borderTop: '1px solid grey',
      borderBottom: '1px solid grey',
      paddingTop:theme.spacing(2),
      paddingBottom:theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'start',
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
    <div className={classes.container}>
      <div className={classes.row}>
        <div style={{marginTop:16}}>
         <div>
         <IconButton onClick={upvote}>
            <ThumbUpIcon />
          </IconButton>{' '}
          <span>{props.question.upVotes.length}</span>
         </div>
         <div>
           <span>{props.question.answers.length} answer{props.question.answers.length != 1 && 's'}</span>
         </div>
        </div>
        <div style={{marginLeft:24}}>
          <h4>{props.question.title}</h4>
          <p>{props.question.text}</p>
        </div>
      </div>
      <div className={classes.row} style={{justifyContent:'space-between', marginTop:16}}>
        <Button>Give Answer</Button>
        <Button>Show Answers</Button>
      <Chip label="Not answered" icon={<RadioButtonUncheckedIcon />} />
      </div>
    </div>
  );
}

export default QuestionListEntry;
