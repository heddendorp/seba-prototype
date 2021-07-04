import './lecture-watch.module.scss';
import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Icon,
  SvgIconProps,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import {LectureService, LectureUnitService} from "@seba/api-services";
import AddIcon from '@material-ui/icons/Add';
import {ILecture} from "@seba/models";

/*import { Card, CardMedia, IconButton } from '@material-ui/core';*/
/* eslint-disable-next-line */

export interface LectureWatchProps {lecture_id : string}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      font: 'Roboto',
      display: 'flex',
      flexDirection: 'row',
    },
    chat: {
      padding: theme.spacing(2),
      border: '1px solid black',
      borderRadius: 3,
      backgroundColor: '#d3d3d3',
      width: '75%',
    },
    media: {
      width: '97%',

    },
    doubts: {
      padding: theme.spacing(2),
      font: 'Calibri',
      backgroundColor: '#ffffff',
      width: '97%',
    },
    groups: {
      padding: theme.spacing(3),
      border: '1px solid black',
      borderRadius: 3,
      backgroundColor: '#d3d3d3',
      width: '75%',
      height: '10 px',
    }
  })
);

export function LectureWatch(props: LectureWatchProps) {
  const params = useParams();
  const classes = useStyles();

  const [Title, setTitle] = useState();
  //const [renderedDescription, setRenderedDescription] = useState();

  function renderTitle(title: string) {
    return(
      <h2>{title}</h2>
    );
  }

  function renderDescription(description: string) {
    return(
      <h3>{description}</h3>
    );
  }

  useEffect(() => {
    


  
    const getLecture = async () => await LectureService.getById(props.lecture_id);

    getLecture().then(lecture => {
      setTitle(lecture.title)
      //setShortTitle(lecture.short_title)
      //setSemester(lecture.semester)
    });

    //renderDelayed();
  }, []);

  return (
    <main>
      <div className={classes.root}>
        {Title}
        <h2>Hello</h2>
      </div>
      <div className={classes.root}>
        <Grid item xs={9}>
          <Paper variant="outlined" className={classes.media}>
            <Container>
            <video controls width="100%">
              <source
                src="https://test-videos.co.uk/vids/bigbuckbunny/mp4/av1/360/Big_Buck_Bunny_360_10s_1MB.mp4"
                type="video/mp4"
              />
              Sorry, your browser does not support embedded videos.
            </video>
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper variant="outlined" className={classes.chat}>
            <Container>
              <h3>Chatbox comes here!</h3>
            </Container>
          </Paper>
        </Grid>
      </div>

      <div>
        <Grid item xs = {9}>
          <Paper variant="outlined" className={classes.doubts}>
            <Container>
              
              <h4>I have the description</h4>
            </Container>
          </Paper>
        </Grid>
      </div>

      <div className={classes.root}>
        <Grid item xs = {9}>
          <Paper variant="outlined" className={classes.doubts}>
          <Container>
            <h3>All doubts</h3>
              <p>
                Doubt 1
              </p>
            </Container>
          </Paper>
        </Grid>
        <Grid item xs = {3}>
          <Paper variant="outlined" className={classes.groups}>
            <Container>
              <div className={classes.root}>
                <Grid item xs = {10}>
                  <h3>Study rooms</h3>
                </Grid>
                <Grid item xs = {2}>
                  <AddIcon
                    //onClick={this.joinGroup}
                  >
                  </AddIcon>             
                </Grid>
              </div>
              <p>
                  To join a group, click on the + icon.
              </p>
            </Container>
          </Paper>
        </Grid>
      </div>
      
    </main>
  );
}

export default LectureWatch;
