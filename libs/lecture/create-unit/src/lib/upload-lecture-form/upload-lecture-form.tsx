import {
  Button,
  createStyles,
  Grid,
  LinearProgress,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import UploadLectureDropzone from '../upload-lecture-dropzone/upload-lecture-dropzone';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface UploadLectureFormProps {
  handleSubmit: (
    title: string,
    dateTime: string,
    description: string,
    file: File
  ) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formStyle: {
      maxWidth: 900,
    },
    formProgressBar: {
      width: '100%',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  })
);

export function UploadLectureForm(props: UploadLectureFormProps) {
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  //not sure about this initial value ""{} as File
  const [file, setFile] = useState({} as File);

  const [progress, setProgress] = useState(0);

  const classes = useStyles();

  //just some random progressBar progress --> will start, when this component is rendered
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    //clean up
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    //this prevents closing dialog when clicking submit
    e.preventDefault();
    //you can give values from from to parent object here
    props.handleSubmit(title, dateTime, description, file);
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
            onChange={onChangeTitle}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            id="datetime-local"
            label="Publish date"
            type="datetime-local"
            defaultValue="2017-05-24T10:30"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={onChangeDateTime}
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
            onChange={onChangeDescription}
          />
        </Grid>
        <Grid item xs={12}>
          <UploadLectureDropzone setFile={setFile} />
        </Grid>
        <Grid item xs={12}>
          <LinearProgress
            variant="determinate"
            className={classes.formProgressBar}
            value={progress}
          />
        </Grid>
        <Grid item xs={12}>
          <Button autoFocus>Cancel</Button>
          <Button color="primary" type="submit">
            Upload
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default UploadLectureForm;
