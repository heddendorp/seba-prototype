import { render } from '@testing-library/react';

import LectureQuizzes from './lecture-quizzes';

describe('LectureQuizzes', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LectureQuizzes />);
    expect(baseElement).toBeTruthy();
  });
});
