import { render } from '@testing-library/react';

import QuestionDetails from './question-details';

describe('QuestionDetails', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuestionDetails />);
    expect(baseElement).toBeTruthy();
  });
});
