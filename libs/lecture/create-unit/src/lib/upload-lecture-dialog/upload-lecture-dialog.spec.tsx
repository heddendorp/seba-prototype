import { render } from '@testing-library/react';

import UploadLectureDialog from './upload-lecture-dialog';

describe('UploadLectureDialog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UploadLectureDialog />);
    expect(baseElement).toBeTruthy();
  });
});
