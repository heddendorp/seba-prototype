import './create-lecture.module.scss';
import { useState } from 'react';
import UploadLectureDialog from './upload-lecture-dialog/upload-lecture-dialog';
import UploadLectureForm from './upload-lecture-form/upload-lecture-form';
import { Button } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import {LectureUnitService} from "../../../../api-services/src/lib/lecture-unit-service";

/* eslint-disable-next-line */
export interface CreateLectureProps {}

/*
  Todo-create-lecture:
    -error warning in log after opening upload dialog
    -progressbar doesn't work properly, just add some time for the progressbar => start progress on upload
    -video preview: use the component from watch lecture
 */

export function CreateUnit(props: CreateLectureProps) {
  const params = useParams();
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleSubmit = async (
    title: string,
    dateTime: string,
    description: string,
    file: File
  ) => {
    await LectureUnitService.create({
      lecture_id: params.lecture_id,
      title: title,
      description: description,
      publish_date: dateTime,
      video_path: file == undefined ? "" : file.name
    })
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
