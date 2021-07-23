import { render } from '@testing-library/react';

import SocketContext from './socket-context';

describe('SocketContext', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SocketContext />);
    expect(baseElement).toBeTruthy();
  });
});
