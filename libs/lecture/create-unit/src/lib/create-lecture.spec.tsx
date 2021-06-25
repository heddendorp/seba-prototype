import { render } from '@testing-library/react';

import CreateUnit from './create-unit';

describe('CreateLecture', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateUnit />);
    expect(baseElement).toBeTruthy();
  });
});
