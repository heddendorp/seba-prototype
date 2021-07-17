import { render } from '@testing-library/react';

import AddQuesionTrigger from './add-quesion-trigger';

describe('AddQuesionTrigger', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AddQuesionTrigger />);
    expect(baseElement).toBeTruthy();
  });
});
