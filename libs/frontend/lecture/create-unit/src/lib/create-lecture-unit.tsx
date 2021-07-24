import LectureUnitForm from './lecture-unit-form';
import {useParams} from 'react-router-dom';
import {LectureUnitService} from '@seba/frontend/api-services';
import {useStyles} from './styles';
import {useLectureContext} from '@seba/frontend/context';

type CreateUnitURLParams = {
  lecture_id: string;
};

export function CreateLectureUnit() {
  const classes = useStyles();
  const context = useLectureContext();
  const params = useParams<CreateUnitURLParams>();

  const handleSubmit = async (
    title: string,
    dateTime: string,
    description: string,
    file: File,
    setProgress: (value: ((prevState: number) => number) | number) => void
  ) =>
    LectureUnitService.uploadVideo({
      file: file,
      onProgress: (e) => setProgress((e.loaded / e.total) * 100),
      callback: (response) => {
        const body = JSON.parse(response);
        if (body.message !== 'Success.') throw new Error(body.message);

        LectureUnitService.create({
          lecture_id: params.lecture_id,
          title: title,
          description: description,
          publish_date: new Date(dateTime),
          video_path: body.video_path,
        }).then(() => context.updateLectures());
      },
    });

  return (
    <div className={classes.root}>
      <LectureUnitForm handleSubmit={handleSubmit} unit_id={undefined}/>
    </div>
  );
}

export default CreateLectureUnit;
