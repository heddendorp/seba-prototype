import { Grid, Typography } from '@material-ui/core';
import { QuestionService } from '@seba/frontend/api-services';
import { useEffect, useReducer, useState } from 'react';
import AddQuesionTrigger from '../add-quesion-trigger/add-quesion-trigger';
import QuestionListEntry from '../question-list-entry/question-list-entry';

/* eslint-disable-next-line */
export interface LectureQuestionsProps {
  currentTime: number;
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

  // state with the questions that are currently displayed
  const [displayedQuestions, setDisplayedQuestions] = useState([]);

  // effect to update questions on time change
  useEffect(() => {
    const questionCopy = questions.slice();
    questionCopy.sort((a, b) => {
      const aDist = Math.abs(a.timestamp - props.currentTime);
      const bDist = Math.abs(b.timestamp - props.currentTime);
      if (aDist < bDist) {
        return -1;
      }
      if (aDist > bDist) {
        return 1;
      }
      return 0;
    });
    // display the first three questions
    setDisplayedQuestions(questionCopy.slice(0, 3));
  }, [props.currentTime, questions]);

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
      <Typography variant="h4" component="h3" gutterBottom>
        Questions
      </Typography>
      <AddQuesionTrigger
        lecureUnitId={props.lecureUnitId}
        currentTime={props.currentTime}
        onNewQuestion={handleQuestionAdded}
      />
      {displayedQuestions.map((question, index) => (
        <QuestionListEntry
          key={question._id}
          question={question}
          onQuestionUpdate={handleQuestionUpdated}
        />
      ))}
    </div>
  );
}

export default LectureQuestions;
