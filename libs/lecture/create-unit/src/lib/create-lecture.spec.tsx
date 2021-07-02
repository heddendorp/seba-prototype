import { render } from '@testing-library/react';

import CreateLectureUnit from './create-lecture-unit';

describe('CreateLecture', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CreateLectureUnit />);
    expect(baseElement).toBeTruthy();
  });
});
