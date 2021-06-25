/* eslint-disable-next-line */
import {Button, Container, CssBaseline, Link, makeStyles, TextField, Typography} from "@material-ui/core";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {LectureService} from "../../../../api-services/src/lib/lecture-service";
import {useStyles} from "./style";

export interface LectureCreateProps {}

export function LectureCreate(props: LectureCreateProps) {
  const history = useHistory();
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [semester, setSemester] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await LectureService.create({
      title: title,
      short_title: title,
      semester: semester
    });
    history.push("/ID");
  }

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onChangeSemester = (e: ChangeEvent<HTMLInputElement>) => {
    setSemester(e.target.value)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create Lecture
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title"
            name="title"
            autoFocus
            autoComplete="username"
            onChange={onChangeTitle}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="semester"
            label="Semester"
            id="semester"
            onChange={onChangeSemester}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default LectureCreate;
