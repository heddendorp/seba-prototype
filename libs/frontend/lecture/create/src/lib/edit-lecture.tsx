import { Container, CssBaseline, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { useStyles } from './style';
import { LectureForm } from './lecture-form';
import { LectureService } from '@seba/frontend/api-services';
import { useLectureContext } from '@seba/frontend/context';

type EditLectureURLParams = {
  lecture_id: string;
};

export function EditLecture() {
  const classes = useStyles();
  const context = useLectureContext();
  const params = useParams<EditLectureURLParams>();

  const handleSubmit = async (
    title: string,
    short_title: string,
    semester: string
  ) => {
    LectureService.update(params.lecture_id, {
      title: title,
      short_title: short_title,
      semester: semester,
    }).then(() => context.updateLectures());
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Lecture
        </Typography>
        <LectureForm
          handleSubmit={handleSubmit}
          lecture_id={params.lecture_id}
        />
      </div>
    </Container>
  );
}

export default EditLecture;
