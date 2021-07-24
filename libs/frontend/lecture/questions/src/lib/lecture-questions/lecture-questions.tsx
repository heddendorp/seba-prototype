import {Grid} from '@material-ui/core';
import {QuestionService} from '@seba/frontend/api-services';
import {useEffect, useReducer} from 'react';
import AddQuesionTrigger from '../add-quesion-trigger/add-quesion-trigger';
import QuestionListEntry from '../question-list-entry/question-list-entry';

/* eslint-disable-next-line */
export interface LectureQuestionsProps {
  videoReference: any;
  lecureUnitId: string;
}

// reducer to manage questions
export const LectureQuestionsReducer = (
  state: any[],
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case 'ADD_QUESTION':
      return [...state, action.payload];
    case 'SET_STATE':
      return action.payload;
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

export function LectureQuestions(props: LectureQuestionsProps) {
  // state with reducer to save questions
  const [questions, dispatch] = useReducer(LectureQuestionsReducer, []);

  // handle a question added
  const handleQuestionAdded = (question: any) => {
    console.log(question);
    dispatch({
      type: 'ADD_QUESTION',
      payload: question,
    });
  };

  // handle a question updated
  const handleQuestionUpdated = (question: any) => {
    console.log(question);
    dispatch({
      type: 'UPDATE_QUESTION',
      payload: question,
    });
  };

  // effect to load questions
  useEffect(() => {
    QuestionService.getAll(props.lecureUnitId).then((questions: any) => {
      dispatch({
        type: 'SET_STATE',
        payload: questions,
      });
    });
  }, [props.lecureUnitId]);

  return (
    <div>
      <h3>Questions</h3>
      <AddQuesionTrigger
        lecureUnitId={props.lecureUnitId}
        videoReference={props.videoReference}
        onNewQuestion={handleQuestionAdded}
      />
      <Grid container spacing={1} direction="column">
        {questions.map((question) => (
          <Grid item key={question._id}>
            <QuestionListEntry
              question={question}
              onQuestionUpdate={handleQuestionUpdated}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default LectureQuestions;
