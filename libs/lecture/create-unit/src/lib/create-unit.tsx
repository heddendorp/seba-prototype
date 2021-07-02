import './create-lecture.module.scss';
import CreateUnitForm from './create-unit-form';
import {useParams} from 'react-router-dom';
import {LectureUnitService} from "@seba/api-services";
import {useLectureContext} from "@seba/context";
import {useStyles} from "./styles";

type CreateUnitURLParams = {
  lecture_id: string
}

export function CreateUnit() {
  const context = useLectureContext();
  const classes = useStyles();
  const params = useParams<CreateUnitURLParams>();

  const handleSubmit = async (title: string, dateTime: string, description: string, file: File,
                              setProgress: (value: (((prevState: number) => number) | number)) => void) => {
    await LectureUnitService.uploadVideo({
      file: file,
      onProgress: e => setProgress(e.loaded / e.total * 100),
      callback: response => {
        const body = JSON.parse(response);
        if (body.message !== "Success.")
          throw new Error(body.message);

        LectureUnitService.create({
          lecture_id: params.lecture_id,
          title: title,
          description: description,
          publish_date: new Date(dateTime),
          video_path: JSON.parse(response).video_path
        }).then(() => context.updateLectures())
      }
    });
  };

  return (
    <div className={classes.root}>
      <CreateUnitForm handleSubmit={handleSubmit}/>
    </div>
  );
}

export default CreateUnit;
