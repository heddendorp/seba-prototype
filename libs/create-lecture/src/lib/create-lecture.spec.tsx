import { render } from '@testing-library/react';

import CreateLecture from './create-lecture';

describe('CreateLecture', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateLecture />);
    expect(baseElement).toBeTruthy();
  });
});
