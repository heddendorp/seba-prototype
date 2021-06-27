import { Route, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import NewQuestionDialog from './new-question-dialog/new-question-dialog';
import React from 'react';
import QuestionList from './question-list/question-list';

/* eslint-disable-next-line */
export interface QuestionsProps {}

export function Questions(props: QuestionsProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Welcome to questions!</h1>
      <Button variant={'outlined'} onClick={handleClickOpen}>Add question</Button>
      <NewQuestionDialog open={open} onClose={handleClose}/>
      <QuestionList/>
      <ul>
        <li>
          <Link to="/questions">questions root</Link>
        </li>
      </ul>
      <Route
        path="/"
        render={() => <div>This is the questions root route.</div>}
      />
    </div>
  );
}

export default Questions;
