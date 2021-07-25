import { DropzoneArea } from 'material-ui-dropzone';
import { useStyles } from '../styles';

export interface UploadLectureDropzoneProps {
  setFile: (file: File) => void;
}

// Docs for the dropzone: https://yuvaleros.github.io/material-ui-dropzone/
export function UploadLectureDropzone(props: UploadLectureDropzoneProps) {
  const { setFile } = props;
  const classes = useStyles();

  const onChangeFile = (files: File[]) => {
    setFile(files[0]);
  };

  return (
    <DropzoneArea
      filesLimit={1}
      acceptedFiles={['video/*']}
      showPreviews={true}
      showPreviewsInDropzone={false}
      useChipsForPreview
      previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
      previewChipProps={{ classes: { root: classes.previewChip } }}
      previewText="Selected file:"
      onChange={onChangeFile}
      maxFileSize={1024 * 1024 * 1024} // Limited to 1 GB
    />
  );
}

export default UploadLectureDropzone;
