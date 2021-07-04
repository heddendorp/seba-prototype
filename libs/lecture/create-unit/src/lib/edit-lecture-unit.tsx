import LectureUnitForm from './lecture-unit-form';
import {useParams} from 'react-router-dom';
import {useLectureContext} from "@seba/context";
import {useStyles} from "./styles";
import {LectureUnitService} from "@seba/api-services";
import {IEditLectureUnitTransport} from "@seba/api-interfaces";

type EditUnitURLParams = {
  unit_id: string
}

export function EditLectureUnit() {
  const classes = useStyles();
  const context = useLectureContext();
  const params = useParams<EditUnitURLParams>();

  const handleSubmit = async (title: string, dateTime: string, description: string, file: File,
                              setProgress: (value: (((prevState: number) => number) | number)) => void) => {
    let updatedFilePath = undefined;
    if (file !== undefined)
      await LectureUnitService.uploadVideo({
        file: file,
        onProgress: e => setProgress(e.loaded / e.total),
        callback: response => {
          const body = JSON.parse(response);
          if (body.message !== "Success.")
            throw new Error(body.message);

          updatedFilePath = body.video_path;
        }
      });

    const body = {
      title: title,
      description: description,
      publish_date: new Date(dateTime)
    } as IEditLectureUnitTransport;

    if (updatedFilePath !== undefined)
      body.video_path = updatedFilePath;

    LectureUnitService
      .update(params.unit_id, body)
      .then(() => context.updateLectures());
  };

  return (
    <div className={classes.root}>
      <LectureUnitForm handleSubmit={handleSubmit} unit_id={params.unit_id}/>
    </div>
  );
}

export default EditLectureUnit;
