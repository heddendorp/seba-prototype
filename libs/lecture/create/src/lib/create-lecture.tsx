import {Container, CssBaseline, Typography} from "@material-ui/core";
import {LectureService} from "@seba/api-services";
import {useStyles} from "./style";
import {LectureForm} from "./lecture-form";
import {useLectureContext} from "@seba/context";

export function CreateLecture() {
  const classes = useStyles();
  const context = useLectureContext();

  const handleSubmit = async (title: string, short_title: string, semester: string,) =>
    LectureService.create({
      title: title,
      short_title: short_title,
      semester: semester
    }).then(() => context.updateLectures());

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
