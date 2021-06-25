import './lecture-watch.module.scss';
import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
/*import { Card, CardMedia, IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
*/
/* eslint-disable-next-line */
export interface LectureWatchProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(2),
    },
    media: {
      width: '100%',
    },
  })
);

export function LectureWatch(props: LectureWatchProps) {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <h2>Lecture 135:</h2>

      <Grid item xs={12}>
        <Paper variant="outlined" className={classes.padded}>
          <video controls width="100%">
            <source
              src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/av1/360/Big_Buck_Bunny_360_10s_1MB.mp4"
              type="video/mp4"
            ></source>
            Sorry, your browser does not support embedded videos.
          </video>
        </Paper>
      </Grid>
    </Container>
  );
}

export default LectureWatch;
