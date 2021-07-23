import { render } from '@testing-library/react';

import AppContainer from './app-container';

describe('AppContainer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppContainer />);
    expect(baseElement).toBeTruthy();
  });
});
