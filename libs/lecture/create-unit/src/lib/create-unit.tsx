import './create-lecture.module.scss';
import { useState } from 'react';
import UploadLectureDialog from './upload-lecture-dialog/upload-lecture-dialog';
import UploadLectureForm from './upload-lecture-form/upload-lecture-form';
import { Button } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

/* eslint-disable-next-line */
export interface CreateLectureProps {}

/*
  Todo-create-lecture:
    -error warning in log after opening upload dialog
    -progressbar doesn't work properly, just add some time for the progressbar => start progress on upload
    -video preview: use the component from watch lecture
 */

export function CreateUnit(props: CreateLectureProps) {
  const location = useLocation();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleSubmit = (
    title: string,
    dateTime: string,
    description: string,
    file: File
  ) => {
    fetch('http://localhost:3333/lecture-unit/create', {
      method: 'POST',
      body: JSON.stringify({
        lecture_id: location.state.lecture._id,
        title: title,
        description: description,
        publish_date: dateTime,
        video_path: file === undefined ? '' : file.name,
      }),
      headers: new Headers({ Authorization: 'Bearer ' + location.state.token }),
    })
      .then((response) => console.log(response.json()))
      .catch((error) => alert(error));
  };

  return (
    <div>
      <Button variant="outlined" color="secondary">
        Delete lecture
      </Button>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Upload lecture
      </Button>
      <UploadLectureDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      >
        <UploadLectureForm handleSubmit={handleSubmit} />
      </UploadLectureDialog>
    </div>
  );
}

export default CreateUnit;
