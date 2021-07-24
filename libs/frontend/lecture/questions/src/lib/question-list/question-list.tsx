import QuestionListEntry from '../question-list-entry/question-list-entry';
import {FormControl, Grid, InputLabel, MenuItem, Select,} from '@material-ui/core';
import {useEffect, useState} from 'react';
import {QuestionService} from '@seba/frontend/api-services';

/* eslint-disable-next-line */
export interface QuestionListProps {
}

export function QuestionList(props: QuestionListProps) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    QuestionService.getAll().then(
      (result) => {
        setIsLoaded(true);
        setQuestions(result);
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <Grid container spacing={1} justify="space-between">
          <Grid item>
            <h2>All questions</h2>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="questions-sort-by-label">Sort by</InputLabel>
              <Select labelId="questions-sort-by-label">
                <MenuItem value="likes">Most likes</MenuItem>
                <MenuItem value="time">Most recent</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3} direction="column">
          {questions.map((question) => (
            <Grid item key={question._id}>
              <QuestionListEntry question={question}/>
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}

export default QuestionList;
