import {Container, createStyles, Grid, makeStyles, Paper, Theme,} from '@material-ui/core';
import {VictoryChart, VictoryBar, VictoryLine, VictoryTheme} from 'victory';
import { StatisticService, LectureService, LectureUnitService, UserService } from '@seba/frontend/api-services';
import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import { ILectureUnit, IUser } from '@seba/backend/models';

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

  useEffect(() => {
    UserService.getCurrent().then((user) => setUser(user));

    LectureService.getById(params.lecture_id).then((lecture) => {
      setlectTitle(lecture.title);
      //setunits(lecture.units as [ILectureUnit]);
    });

  }, [params.lecture_id]);
/*
  useEffect(() => {
    LectureUnitService.
  });

    const Stats = async () => await StatisticService.getByLectureId(params.lecture_id);
    console.log('hello');
    console.log(Stats);
    console.log('hi');
*/

  useEffect(() => {
    StatisticService.getByLectureId(params.lecture_id).then((stat) => {
      console.log(stat);
      
      //setstats(stat.unitStatistics.quizStatistics);
    });

    console.log('hello');
    console.log(stats);
    console.log('hi');
  }, [params.lecture_id]);

  return (
    <Container className={classes.padded}>
      <h1>Statistics for {lectTitle}</h1>
      <Paper variant="outlined" className={classes.padded}>
        <h2>Unit 1</h2>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryBar/>
            </VictoryChart>
          </Grid>
          <Grid item xs={6}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine/>
            </VictoryChart>
          </Grid>
        </Grid>
      </Paper>
      
    </Container>
  );
}

export default Statistics;
