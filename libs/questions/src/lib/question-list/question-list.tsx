import QuestionListEntry from '../question-list-entry/question-list-entry';
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@material-ui/core';

/* eslint-disable-next-line */
export interface QuestionListProps {}

export function QuestionList(props: QuestionListProps) {
  return (
    <>
      <Grid container spacing={1} justify='space-between'>
        <Grid item>
          <h2>All questions</h2>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="questions-sort-by-label">Sort by</InputLabel>
            <Select labelId="questions-sort-by-label">
              <MenuItem value="likes">Most likes</MenuItem>
              <MenuItem value='time'>Most recent</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={3} direction="column">
        {[...Array(7).keys()].map((id) => (
          <Grid item>
            <QuestionListEntry id={id.toString()} />
          </Grid>
        ))}
      </Grid></>
  );
}

export default QuestionList;
