import QuestionListEntry from '../question-list-entry/question-list-entry';
import { Grid } from '@material-ui/core';

/* eslint-disable-next-line */
export interface QuestionListProps {}

export function QuestionList(props: QuestionListProps) {
  return (
    <Grid container spacing={3}>
      {[...Array(7).keys()].map((id) => (
        <Grid item xs={12}>
          <QuestionListEntry id={id.toString()} />
        </Grid>
      ))}
    </Grid>
  );
}

export default QuestionList;
