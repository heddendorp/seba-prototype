import QuizList from "./quiz-list";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface LectureQuizzesProps {
}

export function LectureQuizzes(props: LectureQuizzesProps) {

  return (
    <div>
      <h1>Welcome to lecture-quizzes!</h1>
      <QuizList/>
    </div>
  );
}


export default LectureQuizzes;
