import {
  Button,
  Checkbox, createStyles,
  FormControl,
  FormGroup, FormLabel,
  IconButton,
  makeStyles,
  Paper,
  TextField,
  Theme
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import {useStyles} from "./styles";
import {useState} from "react";

/* eslint-disable-next-line */
export interface QuizListEntryProps {
  quiz: any
  handleQuizSubmit: (quiz: any) => void
}

export function EditQuizListEntry(props: QuizListEntryProps) {

  const[questions, setQuestions] = useState([]);

  const classes = useStyles();
  return (
    //create here form aorund with a submit
    <Paper variant="outlined" className={classes.padded}>
      <FormLabel >Timestamp: 00:00:00</FormLabel>
      <Paper variant="outlined"className={classes.padded} >
        <FormControl>
          <TextField
            label="Question"
            variant="outlined"
            size="small"
          />
          <FormGroup>
            <div>
              <Checkbox onChange={() => {return}} name="gilad" />
              <TextField
                label="Question"
                variant="outlined"
                size="small"
              />
            </div>
          </FormGroup>
        </FormControl>
        <Button>Add Answer</Button>
      </Paper>
      <Button>Add Question</Button>
    </Paper>
  );
}

export default EditQuizListEntry;
