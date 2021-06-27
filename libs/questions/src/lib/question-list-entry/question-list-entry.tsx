import { createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

/* eslint-disable-next-line */
export interface QuestionListEntryProps {
  id: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(3),
    },
  })
);

export function QuestionListEntry(props: QuestionListEntryProps) {
  const classes = useStyles();
  return (
    <Paper variant="outlined" className={classes.padded}>
      <Grid container alignItems="stretch">
        <Grid item xs container justify="space-around"  direction="column">
            <Grid item container alignItems='center' spacing={2}>
              <ThumbUpIcon/> <span>12</span>
            </Grid>
            <Grid item>
              <RadioButtonUncheckedIcon/>
            </Grid>
          </Grid>
        <Grid item xs={11}>
          <h1>Question {props.id}</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            auctor turpis quis enim placerat convallis. Curabitur a ultricies magna.
            Pellentesque cursus massa vel nibh facilisis, a rutrum dui interdum. Sed
            tempor nunc ut metus sollicitudin malesuada. Nunc tristique ligula
            mattis orci ornare, quis porttitor erat convallis. Aliquam erat
            volutpat. Aenean ullamcorper magna sit amet magna aliquam, ut interdum
            risus finibus. Nullam imperdiet orci in pharetra bibendum.
          </p>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default QuestionListEntry;
