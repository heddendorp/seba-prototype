import React, {useEffect, useReducer, useState} from "react";
import {Button, Grid, TextField} from "@material-ui/core";
import EditQuizDialog from "./edit-quiz-dialog/edit-quiz-dialog";
import EditQuizListEntry from "./edit-quiz-list-entry";
import {IQuizTransport} from "@seba/api-interfaces";
import {QuizService} from "@seba/api-services";
import QuizListEntry from "./quiz-list-entry";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface QuizListProps {
}

const initialState: IQuizTransport[] = [];

function reducer(state: IQuizTransport[], action: {type: string; payload: IQuizTransport| any}): IQuizTransport[] {
  switch(action.type){
    case 'addQuiz':{
      return [action.payload, ...state];
    }
    case 'updateQuiz':{
      console.log(action.payload);
      console.log(state);
      //adde mein upgadetets und dann die restlichen außer mein upgedatetes
      return [action.payload.quiz, ...state.filter(q => q._id !== action.payload.oldId)]
    }
    case 'deleteQuiz':{
      return state.filter(q => q._id !== action.payload._id);
    }
  }
  return state;
}

export function QuizList(props: QuizListProps) {

  useEffect( () => {
    QuizService.getAll().then(quizzes => {
      quizzes.map(quiz => dispatch({type: 'addQuiz', payload: quiz}))
    });
  }, []);

  //only on useEffect (initial render fill with these ones)
  const [quizzes, dispatch] = useReducer(reducer, initialState);
  const [open, setOpen] = React.useState(false);

  const handleClose = (quiz?: IQuizTransport | null) => {
    if(quiz != null) {
      QuizService.create(quiz).then(payload => {
        dispatch({type: 'addQuiz', payload: payload})
      })
    }
    console.log(quiz);
    setOpen(false)
  }

  const handleEditQuiz = (quiz: any) => {
    if(quiz != null) {
      QuizService.update(quiz._id, quiz).then(updatedQuiz => 
        dispatch({type: 'updateQuiz', payload: {oldId: quiz._id, quiz: updatedQuiz}})
      )
    }
  }

  const handleDeleteQuiz = (quiz: IQuizTransport) => {
      QuizService.delete(quiz._id as string).then(payload => {
        dispatch({type: 'deleteQuiz', payload: payload})
      });
  }

  return (
    <>
      <Button variant={'outlined'} onClick={() => (
        //dispatch({type: 'addQuiz', payload: {timestamp: 1}})
        setOpen(true)

      )}>Add Quiz</Button>
      {/* wirklich hier schon initialisieren den dialog? */}
      <EditQuizDialog open={open} handleClose={handleClose}/>
        <Grid container spacing={1} direction="column">
          {
            quizzes
              .map((quiz) => (
              <Grid item key={quiz._id}>
                <QuizListEntry quiz={quiz} handleEditQuiz={handleEditQuiz} handleDeleteQuiz={handleDeleteQuiz}/>
              </Grid>
            ))
          }
        </Grid>
    </>);
}

export default QuizList;
