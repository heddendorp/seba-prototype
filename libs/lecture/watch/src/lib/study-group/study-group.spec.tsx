import { render } from '@testing-library/react';

import StudyRoom from './study-room';

describe('StudyRoom', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<StudyRoom />);
    expect(baseElement).toBeTruthy();
  });
});
