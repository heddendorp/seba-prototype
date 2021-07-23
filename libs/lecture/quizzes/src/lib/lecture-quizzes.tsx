import QuizList from "./quiz-list";
import {Grid} from "@material-ui/core";
import React from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LectureQuizzesProps {
}

export function LectureQuizzes(props: LectureQuizzesProps) {

  return (
    <div>
      <h1>Welcome to lecture-quizzes!</h1>
      {/* <video controls width="100%">
          <source
            src={video_path}
            type=".mp4"
          />
          Sorry, your browser does not support embedded videos.
        </video> */}
      <QuizList/>
    </div>
  );
}


export default LectureQuizzes;
