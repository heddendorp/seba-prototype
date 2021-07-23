import { render } from '@testing-library/react';

import QuestionList from './question-list';

describe('QuestionList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuestionList />);
    expect(baseElement).toBeTruthy();
  });
});
