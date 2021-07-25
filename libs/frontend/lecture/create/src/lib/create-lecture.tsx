import {Container, CssBaseline, Typography} from '@material-ui/core';
import {LectureService} from '@seba/frontend/api-services';
import {useStyles} from './style';
import {LectureForm} from './lecture-form';
import {useLectureContext} from '@seba/frontend/context';
import {useHistory} from 'react-router-dom';

export function CreateLecture() {
  const classes = useStyles();
  const context = useLectureContext();
  const history = useHistory();

  const handleSubmit = async (
    title: string,
    short_title: string,
    semester: string
  ) =>
    LectureService.create({
      title: title,
      short_title: short_title,
      semester: semester,
    }).then(response => {
      context.updateLectures();
      response.json().then(body =>
        history.push(`/app/lecture/${body.lecture_id}/unit/create`));
    });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Lecture
        </Typography>
        <LectureForm handleSubmit={handleSubmit} lecture_id={undefined}/>
      </div>
    </Container>
  );
}

export default CreateLecture;
