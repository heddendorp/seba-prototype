/* eslint-disable-next-line */
import {Container} from "@material-ui/core";

export interface LectureQuizzesProps {}

export function LectureQuizzes(props: LectureQuizzesProps) {
  return (
    <Container component="main" maxWidth="xs">
      <div>
        <h1>Welcome to lecture-quizzes!</h1>
      </div>
    </Container>
  );
}

export default LectureQuizzes;
