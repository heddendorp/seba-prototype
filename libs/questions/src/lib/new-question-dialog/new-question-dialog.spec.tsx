import { render } from '@testing-library/react';

import NewQuestionDialog from './new-question-dialog';

describe('NewQuestionDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewQuestionDialog />);
    expect(baseElement).toBeTruthy();
  });
});
