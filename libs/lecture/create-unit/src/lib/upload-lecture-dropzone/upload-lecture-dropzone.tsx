import { createStyles, makeStyles, Theme } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';

/* eslint-disable-next-line */
export interface UploadLectureDropzoneProps {
  setFile: (file: File) => void;
}

/*
  Docs for the dropzone: https://yuvaleros.github.io/material-ui-dropzone/
 */

/*
  TODO:
    -dropzone freeze with large file
 */

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    previewChip: {
      maxWidth: 800,
    },
  })
);

export function UploadLectureDropzone(props: UploadLectureDropzoneProps) {
  const { setFile } = props;
  const classes = useStyles();

  const onChangeFile = (files: File[]) => {
    setFile(files[0]);
  };

  return (
    <DropzoneArea
      filesLimit={1}
      //at the moment it is set to nothing - todo: set to video
      //acceptedFiles={['video/*']}
      showPreviews={true}
      showPreviewsInDropzone={false}
      useChipsForPreview
      previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
      previewChipProps={{ classes: { root: classes.previewChip } }}
      previewText="Selected file:"
      onChange={onChangeFile}
      maxFileSize={1024 * 1024 * 1024}  // Limited to 1 GB
    />
  );
}

export default UploadLectureDropzone;
