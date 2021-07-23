import { render } from '@testing-library/react';

import EditQuizDialog from './edit-quiz-dialog';

describe('EditQuizDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditQuizDialog />);
    expect(baseElement).toBeTruthy();
  });
});
