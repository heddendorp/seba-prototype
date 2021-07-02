import {Button, TextField} from "@material-ui/core";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useStyles} from "./style";
import {LectureService} from "@seba/api-services";
import {useParams} from 'react-router-dom';

/* eslint-disable-next-line */
export interface CreateLectureFormProps {
  handleSubmit: (
    title: string,
    short_title: string,
    semester: string,
  ) => void;
}

export function CreateLectureForm(props: CreateLectureFormProps) {

  const [title, setTitle] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [semester, setSemester] = useState("");

  const classes = useStyles();
  const params = useParams();

  useEffect(  () => {
    //todo: problem when only switch between edit views
    const lecture = async () => await LectureService.getById(params.lecture_id);

    lecture().then((lec) => {
      setTitle(lec.title)
      setShortTitle(lec.short_title)
      setSemester(lec.semester)
    });
    //todo add error handling
  }, []);



  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onChangeShortTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setShortTitle(e.target.value)
  }

  const onChangeSemester = (e: ChangeEvent<HTMLInputElement>) => {
    setSemester(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    //todo why it gets redirected to query url without the preventDefault?
    e.preventDefault();
    props.handleSubmit(title, shortTitle, semester);
  };

  return (
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
        value={title}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="shortTitle"
        label="Short title"
        name="shortTitle"
        onChange={onChangeShortTitle}
        value={shortTitle}
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
        value={semester}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Submit
      </Button>
    </form>
  );
}
