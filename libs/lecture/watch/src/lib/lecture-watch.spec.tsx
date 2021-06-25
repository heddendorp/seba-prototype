import { render } from '@testing-library/react';

import LectureWatch from './lecture-watch';

describe('LectureWatch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<LectureWatch />);
    expect(baseElement).toBeTruthy();
  });
});
