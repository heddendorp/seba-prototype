import {Container, CssBaseline, Typography} from "@material-ui/core";
import {useHistory, useParams} from "react-router-dom";
import {useStyles} from "./style";
import {CreateLectureForm} from "./create-lecture-form";
import {LectureService} from "@seba/api-services";

/* eslint-disable-next-line */
export interface EditLectureProps {
}

export function EditLecture(props: EditLectureProps) {
  const history = useHistory();
  const classes = useStyles();
  const params = useParams();


  const handleSubmit = async (
    title: string,
    short_title: string,
    semester: string,
  ) => {
    await LectureService.update(params.lecture_id, {
      title: title,
      short_title: title,
      semester: semester
      //todo add error handling
    });


    //todo refresh navigation
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Edit Lecture
        </Typography>
        <CreateLectureForm handleSubmit={handleSubmit}/>
      </div>
    </Container>
  );
}

export default EditLecture;
