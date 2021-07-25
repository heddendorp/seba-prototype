import LectureUnitForm from './lecture-unit-form';
import { useParams } from 'react-router-dom';
import { useLectureContext } from '@seba/frontend/context';
import { useStyles } from './styles';
import { LectureUnitService } from '@seba/frontend/api-services';
import { IEditLectureUnitTransport } from '@seba/shared';

type EditUnitURLParams = {
  unit_id: string;
};

export function EditLectureUnit() {
  const classes = useStyles();
  const context = useLectureContext();
  const params = useParams<EditUnitURLParams>();

  function sendUpdateRequest(body: IEditLectureUnitTransport) {
    LectureUnitService.update(params.unit_id, body).then(() =>
      context.updateLectures()
    );
  }

  const handleSubmit = async (
    title: string,
    dateTime: string,
    description: string,
    file: File,
    setProgress: (value: ((prevState: number) => number) | number) => void
  ) => {
    const body = {
      title: title,
      description: description,
      publish_date: new Date(dateTime),
    } as IEditLectureUnitTransport;

    if (file !== undefined) {
      await LectureUnitService.uploadVideo({
        file: file,
        onProgress: (e) => setProgress(e.loaded / e.total),
        callback: (response) => {
          const responseBody = JSON.parse(response);
          if (responseBody.message !== 'Success.')
            throw new Error(responseBody.message);

          body.video_path = responseBody.video_path;
          sendUpdateRequest(body);
        },
      });
    } else sendUpdateRequest(body);
  };

  return (
    <div className={classes.root}>
      <LectureUnitForm handleSubmit={handleSubmit} unit_id={params.unit_id} />
    </div>
  );
}

export default EditLectureUnit;
