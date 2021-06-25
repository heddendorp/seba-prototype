import './lecture-watch.module.scss';
import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import {LectureService, LectureUnitService} from "@seba/api-services";
import {ILecture} from "@seba/models";
/*import { Card, CardMedia, IconButton } from '@material-ui/core';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
*/
/* eslint-disable-next-line */
export interface LectureWatchProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
    },
    chat: {
      paddingLeft: theme.spacing(2)
    },
    media: {
      width: '100%',
    },
  })
);

export function LectureWatch(props: LectureWatchProps) {
  const params = useParams();
  const classes = useStyles();

  const [renderedTitle, setRenderedTitle] = useState();
  const [renderedDescription, setRenderedDescription] = useState();

  function renderTitle(title: string) {
    return(
      <h2>{title}</h2>
    );
  }

  function renderDescription(description: string) {
    return(
      <h2>{description}</h2>
    );
  }

  useEffect(() => {
    const renderDelayed = async () => {
      const lecture = await LectureUnitService.getById(params.unit_id);
      setRenderedTitle(renderTitle(lecture.title));
      setRenderedDescription(renderDescription(lecture.description));
    };

    renderDelayed();
  }, []);

  return (
    <main>
      {renderedTitle}
      <div className={classes.root}>
        <Grid item xs={9}>
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
        <Grid item xs={3}  className={classes.chat}>
          <Paper variant="outlined">
            <video controls width="100%">
              <source
                src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/av1/360/Big_Buck_Bunny_360_10s_1MB.mp4"
                type="video/mp4"
              ></source>
              Sorry, your browser does not support embedded videos.
            </video>
          </Paper>
        </Grid>
      </div>
      {renderedDescription}
    </main>
  );
}

export default LectureWatch;
