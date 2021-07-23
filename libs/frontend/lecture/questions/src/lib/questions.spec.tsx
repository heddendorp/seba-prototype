import { render } from '@testing-library/react';

import Questions from './questions';

describe('Questions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Questions />);
    expect(baseElement).toBeTruthy();
  });
});
