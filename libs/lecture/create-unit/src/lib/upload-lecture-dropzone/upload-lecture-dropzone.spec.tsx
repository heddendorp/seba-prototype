import { render } from '@testing-library/react';

import UploadLectureDropzone from './upload-lecture-dropzone';

describe('UploadLectureDropzone', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UploadLectureDropzone />);
    expect(baseElement).toBeTruthy();
  });
});
