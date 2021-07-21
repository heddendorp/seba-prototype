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
import AddIcon from '@material-ui/icons/Add';
import {ILecture} from "@seba/models";
import {Chat} from "@seba/chat";
import {Question} from "@seba/lecture/questions"

import Typography from '@material-ui/core/Typography';

/*import { Card, CardMedia, IconButton } from '@material-ui/core';*/
/* eslint-disable-next-line */

export interface LectureWatchProps {}
type WatchLectureURLParams = { unit_id: string }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      font: 'Roboto',
      display: 'flex',
      flexDirection: 'row',
      
    },
    text: {
      padding: theme.spacing(2, 2, 0),
    },
    chat: {
      padding: theme.spacing(1),
      border: '1px solid black',
      //borderRadius: 3,
      backgroundColor: '#dfdfdf',
      width: '75%',
      
      //overflow: 'auto',
      //fontSize: '5 px', //does not work, check why
      //display: 'inline'
    },
    paper:{
      paddingBottom: 50,
    },
    list:{
      marginBottom: theme.spacing(2),
    },
    media: {
      width: '97%',
    },
    detail: {
      padding: theme.spacing(2),
      font: 'Calibri',
      width: '97%',
    },
    doubts: {
      padding: theme.spacing(2),
      font: 'Calibri',
      backgroundColor: '#ffffff',
      width: '97%',
    },
    groups: {
      padding: theme.spacing(1),
      border: '1px solid black',
      //borderRadius: 3,
      backgroundColor: '#d3d3d3',
      width: '75%',
      //height: '10 px',
    }
  })
);

export function LectureWatch(props: LectureWatchProps) {
  const params = useParams<WatchLectureURLParams>();
  const classes = useStyles();

  const [Title, setTitle] = useState();
  const [Description, setDescription] = useState();
  //const [VPath, setVPath] = useState();
  

  useEffect(() => {
    console.log(params.unit_id)
    const getLectureUnit = async () => await LectureUnitService.getById(params.unit_id);

    getLectureUnit().then(unit => {
      setTitle(unit.title)
      setDescription(unit.description)
      //setShortTitle(lecture.short_title)
      //setSemester(lecture.semester)
    });

    //renderDelayed();
  }, [params.unit_id]);

  return (
    <main>
      <div className={classes.root}>
        <h2>{Title}</h2>
        
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
          <Paper square className={classes.chat}>
            <Typography className={classes.text} variant="h6" gutterBottom>
              Group chatbox
            </Typography>
            <Chat className={classes.chat}></Chat>
          </Paper>
        </Grid>
      </div>

      <div>
        <Grid item xs = {9}>
          <Paper variant="outlined" className={classes.detail}>
            <Container>
              <h4>{Description}</h4>
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
