import {Button, Grid, LinearProgress, TextField,} from '@material-ui/core';
import UploadLectureDropzone from './upload-lecture-dropzone/upload-lecture-dropzone';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {LectureUnitService} from "@seba/api-services";
import moment from "moment";
import {useStyles} from "./styles";

export interface LectureUnitFormProps {
  unit_id: string | undefined,
  handleSubmit: (
    title: string,
    dateTime: string,
    description: string,
    file: File,
    setProgress: (value: (((prevState: number) => number) | number)) => void
  ) => void;
}

export function LectureUnitForm(props: LectureUnitFormProps) {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState((moment(new Date())).format().slice(0, -9));
  const [description, setDescription] = useState("");
  const [file, setFile] = useState({} as File);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (props.unit_id !== undefined) {
      const lectureUnit = async () => await LectureUnitService.getById(props.unit_id as string);

      lectureUnit().then((unit) => {
        setTitle(unit.title);
        setDateTime((moment(unit.publish_date)).format().slice(0, -9));
        setDescription(unit.description);
      });
    }
  }, [props.unit_id]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    props.handleSubmit(title, dateTime, description, file, setProgress);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeDateTime = (e: ChangeEvent<HTMLInputElement>) => {
    setDateTime(e.target.value);
  };

  const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  return (
    <form className={classes.formStyle} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <TextField
            id="outlined-textarea"
            label="Lecture title"
            placeholder="Enter a lecture title..."
            multiline
            variant="outlined"
            rowsMax={2}
            fullWidth
            value={title}
            onChange={onChangeTitle}
            inputProps={{
              maxLength: 50 //char limit is set to 50
            }}
            required
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="datetime-local"
            label="Publish date"
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
            value={dateTime}
            onChange={onChangeDateTime}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="outlined-textarea"
            label="Lecture description"
            placeholder="Enter a lecture description..."
            multiline
            variant="outlined"
            rowsMax={5}
            fullWidth
            value={description}
            onChange={onChangeDescription}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <UploadLectureDropzone setFile={setFile}/>
        </Grid>
        <Grid item xs={12}>
          <LinearProgress
            variant="determinate"
            className={classes.formProgressBar}
            value={progress}
          />
        </Grid>
        <Grid item xs={12}>
          <div className={classes.finishButton}>
            <Button autoFocus>Cancel</Button>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}

export default LectureUnitForm;
