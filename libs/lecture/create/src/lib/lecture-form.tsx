import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from "@material-ui/core";
import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {useStyles} from "./style";
import {LectureService} from "@seba/api-services";

export interface CreateLectureFormProps {
  lecture_id: string | undefined,
  handleSubmit: (
    title: string,
    short_title: string,
    semester: string,
  ) => void;
}

export function LectureForm(props: CreateLectureFormProps) {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [shortTitle, setShortTitle] = useState("");
  const [semester, setSemester] = useState("");

  const [deleteAlert, setDeleteAlert] = useState(false);

  useEffect(() => {
    if (props.lecture_id !== undefined) {
      const getLecture = async () => await LectureService.getById(props.lecture_id as string);

      getLecture().then(lecture => {
        setTitle(lecture.title)
        setShortTitle(lecture.short_title)
        setSemester(lecture.semester)
      });
    }
  }, [props.lecture_id]);

  function DeleteButton() {
    if (props.lecture_id !== undefined)
      return (
        <div>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={handleOpenDialog}
          >
            Delete
          </Button>
          <Dialog
            open={deleteAlert}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Are you sure you want to delete the lecture?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Deleting the lecture will be permanent and cannot be undone!
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Cancel
              </Button>
              <Button onClick={handleClickDelete} color="secondary" href="/home">
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    return null;
  }

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
    e.preventDefault();
    props.handleSubmit(title, shortTitle, semester);
  };

  const handleOpenDialog = () => setDeleteAlert(true);

  const handleCloseDialog = () => setDeleteAlert(false);

  const handleClickDelete = async () => {
    if (props.lecture_id !== undefined)
      await LectureService.delete(props.lecture_id);

    setDeleteAlert(false);
  }

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
      <DeleteButton/>
    </form>
  );
}
