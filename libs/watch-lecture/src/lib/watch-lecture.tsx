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



export default WatchLecture;
