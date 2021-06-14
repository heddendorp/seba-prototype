import './watch-lecture.module.scss';
import { Container, createStyles, Grid, makeStyles, Paper, Theme } from '@material-ui/core';


/* eslint-disable-next-line */
export interface WatchLectureProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(2)
    },
  }),
);

export function WatchLecture(props: WatchLectureProps) {
  const classes = useStyles();
  return (
    <div>
      <Container className={classes.padded}>
        <h1>Lecture</h1>
        <Paper variant="outlined" className={classes.padded}>
          <h3>Lecture 11: How to create a React page</h3>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <video controls width="250">

                  <source src="/media/cc0-videos/flower.webm"
                          type="video/webm">

                  <source src="/media/cc0-videos/flower.mp4"
                          type="video/mp4">

                  Sorry, your browser does not support embedded videos.
              </video>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}

export default WatchLecture;
