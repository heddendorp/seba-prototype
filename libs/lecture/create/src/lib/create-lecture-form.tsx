import {Button, TextField} from "@material-ui/core";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useStyles} from "./style";

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
  const [semester, setSemester] = useState("");

  const classes = useStyles();

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  const onChangeSemester = (e: ChangeEvent<HTMLInputElement>) => {
    setSemester(e.target.value)
  }

  const handleSubmit = (e: FormEvent) => {
    props.handleSubmit(title, title, semester);
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
  );
}
