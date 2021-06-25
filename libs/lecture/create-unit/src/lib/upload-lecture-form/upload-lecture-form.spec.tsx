import { render } from '@testing-library/react';

import UploadLectureForm from './upload-lecture-form';

describe('UploadLectureForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UploadLectureForm />);
    expect(baseElement).toBeTruthy();
  });
});
