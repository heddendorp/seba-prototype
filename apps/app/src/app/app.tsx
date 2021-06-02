import React, { useEffect, useState } from 'react';
import { Message } from '@seba/api-interfaces';
import { CreateLecture } from '@seba/create-lecture';
import { WatchLecture } from '@seba/watch-lecture';
import { Statistics } from '@seba/statistics';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to app!</h1>
        <img
          width="450"
          src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png"
          alt="Nx - Smart, Extensible Build Framework"
        />
      </div>
      <hr/>
      <p>Create Lecture:</p>
      <CreateLecture></CreateLecture>
      <p>Watch Lecture</p>
      <WatchLecture></WatchLecture>
      <p>Statistics</p>
      <Statistics></Statistics>
      <hr/>
      <div>{m.message}</div>
    </>
  );
};

export default App;
