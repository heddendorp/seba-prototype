import './create-lecture.module.scss';
import CreateUnitForm from './create-unit-form';
import {makeStyles} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import {LectureUnitService} from "../../../../api-services/src/lib/lecture-unit-service";

/* eslint-disable-next-line */
export interface CreateLectureUnitProps {}

/*
  Todo-create-lecture:
    -lecture dialog is at the moment disabled -> discuss
      -error warning in log after opening upload dialog
 */


export const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      alignItems: 'center',
    }
  })
);

export function CreateLectureUnit(props: CreateLectureUnitProps) {
  const classes = useStyles();
  const params = useParams();

  const handleSubmit = async (
    title: string,
    dateTime: string,
    description: string,
    file: File,
    setProgress: (value: (((prevState: number) => number) | number)) => void
  ) => {

    await LectureUnitService.create({
      lecture_id: params.lecture_id,
      title: title,
      description: description,
      publish_date: new Date(dateTime),
      //todo: remove this later
      video_path: file == undefined ? "" : file.name
    })
/*
    const formData = new FormData();
    formData.append("video", file);

    const xhr = new XMLHttpRequest();
    xhr.open("post", "http://localhost:3333/lecture-unit/video", true);

    xhr.upload.onprogress = function(e) {
      setProgress(e.loaded / e.total * 100)
    }

    xhr.send(formData);

 */
  };

  return (
    <div className={classes.root}>
        <CreateUnitForm handleSubmit={handleSubmit} />
    </div>

  );
}

export default CreateLectureUnit;
