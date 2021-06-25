import { render } from '@testing-library/react';

import LectureCreate from './lecture-create';

describe('LectureCreate', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LectureCreate />);
    expect(baseElement).toBeTruthy();
  });
});
