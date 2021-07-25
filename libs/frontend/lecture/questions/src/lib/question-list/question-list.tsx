import QuestionListEntry from '../question-list-entry/question-list-entry';
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@material-ui/core';
import { useEffect, useReducer, useState } from 'react';
import { QuestionService } from '@seba/frontend/api-services';
import { useParams } from 'react-router-dom';

/* eslint-disable-next-line */
export interface QuestionListProps {}

// reducer to manage questions
export const QuestionsReducer = (
  state: any[],
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return [...state, action.payload];
    case 'SET_STATE':
      return action.payload;
      case 'SET_SORTING':{
        const sorting = action.payload;
        switch (sorting) {
          case 'likes': {
            const sorted = [...state].sort((a, b) => {
              if (a.upVotes.length > b.upVotes.length) {
                return -1;
              } else if (a.upVotes.length < b.upVotes.length) {
                return 1;
              }
              return 0;
            });
            return sorted;
          }
          case 'time':{
            return [...state].sort((a, b) => {
              if (a.timestamp > b.timestamp) {
                return 1;
              } else if (a.timestamp < b.timestamp) {
                return-1;
              }
              return 0;
            })
          }
          default: {return state;}
        }
      }
    case 'UPDATE_QUESTION':
      return state.map((question: any) => {
        if (question._id === action.payload._id) {
          return action.payload;
        }
        return question;
      });
    default:
      return state;
  }
};

export function QuestionList(props: QuestionListProps) {
  type LectureQuestionsURLParams = { unit_id: string };
  const params = useParams<LectureQuestionsURLParams>();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [questions, dispatch] = useReducer(QuestionsReducer, []);
  //state of the sorting field
  const [sortBy, setSortBy] = useState('likes');

  useEffect(() => {
    QuestionService.getAll(params.unit_id).then(
      (result) => {
        setIsLoaded(true);
        dispatch({
          type: 'SET_STATE',
          payload: result,
        });
        dispatch({
          type: 'SET_SORTING',
          payload: 'likes',
        });
      },
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, [params.unit_id]);

  // effect to change sorting based on the sortBy field
  useEffect(() => {
    dispatch({
      type: 'SET_SORTING',
      payload: sortBy,
    });
  }, [sortBy]);

  const handleQuestionUpdated = (question: any) => {
    dispatch({
      type: 'UPDATE_QUESTION',
      payload: question,
    });
  };

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
          <Grid item xs={3}>
            <FormControl fullWidth variant="filled">
              <InputLabel id="questions-sort-by-label">Sort by</InputLabel>
              <Select labelId="questions-sort-by-label" onChange={e => setSortBy(e.target.value)} value={sortBy}>
                <MenuItem value="likes">Most likes</MenuItem>
                <MenuItem value="time">Video timeline</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container direction="column">
          {questions.map((question) => (
            <Grid item key={question._id}>
              <QuestionListEntry onQuestionUpdate={handleQuestionUpdated} question={question} />
            </Grid>
          ))}
        </Grid>
      </>
    );
  }
}

export default QuestionList;
