import {Container, CssBaseline, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {LectureService} from "../../../../api-services/src/lib/lecture-service";
import {useStyles} from "./style";
import {CreateLectureForm} from "./create-lecture-form";

/* eslint-disable-next-line */
export interface LectureCreateProps {}

export function CreateLecture(props: LectureCreateProps) {
  const history = useHistory();
  const classes = useStyles();

  const handleSubmit = async (
    title: string,
    short_title: string,
    semester: string,
  ) => {

    await LectureService.create({
      title: title,
      short_title: short_title,
      semester: semester
    });
    history.push("/ID");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Lecture
        </Typography>
        <CreateLectureForm handleSubmit={handleSubmit}/>
      </div>
    </Container>
  );
}

export default CreateLecture;
