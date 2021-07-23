import { render } from '@testing-library/react';

import QuestionListEntry from './question-list-entry';

describe('QuestionListEntry', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<QuestionListEntry />);
    expect(baseElement).toBeTruthy();
  });
});
