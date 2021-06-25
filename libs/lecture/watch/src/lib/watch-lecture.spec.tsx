import { render } from '@testing-library/react';

import WatchLecture from './watch-lecture';

describe('WatchLecture', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WatchLecture />);
    expect(baseElement).toBeTruthy();
  });
});
