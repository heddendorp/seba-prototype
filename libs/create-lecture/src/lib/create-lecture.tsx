import './create-lecture.module.scss';
import {useState} from "react";
import UploadLectureDialog from "./upload-lecture-dialog/upload-lecture-dialog";
import UploadLectureForm from "./upload-lecture-form/upload-lecture-form";
import {Button} from "@material-ui/core";

/* eslint-disable-next-line */
export interface CreateLectureProps {
}

/*
  Todo-create-lecture:
    -error warning in log after opening upload dialog
    -progressbar doesn't work properly, just add some time for the progressbar => start progress on upload
    -video preview: use the component from watch lecture
 */

export function CreateLecture(props: CreateLectureProps) {

  const [openDialog, setOpenDialog] = useState(false)

  const handleOpen = () => {
    setOpenDialog(true)
  }

  const handleSubmit = (title: string, dateTime: string, description: string, file: File) => {
    console.log("Form submitted:")
    console.log(title)
    console.log(dateTime)
    console.log(description)
    console.log(file.name)
  }

  return (
    <div>
      <Button variant="outlined" color="secondary">
        Delete lecture
      </Button>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Upload lecture
      </Button>
      <UploadLectureDialog openDialog={openDialog} setOpenDialog={setOpenDialog}>
        <UploadLectureForm handleSubmit={handleSubmit}/>
      </UploadLectureDialog>
    </div>
  );
}

export default CreateLecture;
