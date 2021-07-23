import { render } from '@testing-library/react';

import LectureQuestions from './lecture-questions';

describe('LectureQuestions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LectureQuestions />);
    expect(baseElement).toBeTruthy();
  });
});
