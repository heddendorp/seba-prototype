import {Container, createStyles, Grid, makeStyles, Paper, Theme,} from '@material-ui/core';
import {VictoryChart, VictoryBar, VictoryLine, VictoryTheme} from 'victory';
import { StatisticService, LectureService, LectureUnitService, UserService } from '@seba/frontend/api-services';
import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import { ILectureUnit, IUser } from '@seba/backend/models';
import _ from 'lodash';
import { stat } from 'node:fs/promises';

/* eslint-disable-next-line */
export interface StatisticsProps {}
type StatisticsParams = { lecture_id: string }

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(2),
    },
  })
);

export function Statistics(props: StatisticsProps) {
  const params = useParams<StatisticsParams>();
  const classes = useStyles();

  const [user, setUser] = useState<IUser>();
  const [lectTitle, setlectTitle] = useState('');
  //const [units, setunits] = useState<[ILectureUnit]>();
  const [stats, setstats] = useState();
  const [currentquiz, setcurrentquiz] = useState();
  const [currentunit, setcurrentunit] = useState();

  useEffect(() => {
    UserService.getCurrent().then((user) => setUser(user));

    LectureService.getById(params.lecture_id).then((lecture) => {
      setlectTitle(lecture.title);
      //setunits(lecture.units as [ILectureUnit]);
    });

    StatisticService.getByLectureId(params.lecture_id).then(stat => {
      setstats(stat);
    });

  }, [params.lecture_id]);

  console.log('stats');
  console.log(stats);
  
  useEffect(() => {
    const unitcounter = 0;
    const quizcounter = 0;
    
  }, [stats]);
/*
  let anObject = {left: 1, right: 2};
  console.log(anObject.left);
  _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
    console.log(key);
  });

*/
  return (
    <Container className={classes.padded}>
      <h1>Statistics for {lectTitle}</h1>
      <Paper variant="outlined" className={classes.padded}>
        <h2>Unit 1</h2>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryBar
                /*data = "stats.statistics.statistics"
                x = {0}
                y = {1}*/
              />
            </VictoryChart>
          </Grid>
          <Grid item xs={6}>
            
          </Grid>
        </Grid>
      </Paper>
      
    </Container>
  );
}

export default Statistics;
