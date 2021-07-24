import {Container, Grid, Paper,} from '@material-ui/core';
import {VictoryChart, VictoryLine, VictoryTheme} from 'victory';
import {useStyles} from "./styles";
import {useEffect, useState} from "react";
import {StatisticService} from "@seba/frontend/api-services";
import {useParams} from "react-router-dom";

/* eslint-disable-next-line */
export interface StatisticsParams {
  lecture_id: string | undefined;
}

export function Statistics() {
  const classes = useStyles();
  const params = useParams<StatisticsParams>();

  const [statistics, setStatistics] = useState();

  useEffect(() => {
    console.log("jo");
    console.log(params.lecture_id);

    if (params.lecture_id !== undefined)
      StatisticService.getByLectureId(params.lecture_id).then(statistics => {
        console.log("ey");
        console.log(statistics);
      });
  }, [params.lecture_id]);

  return (
    <Container className={classes.padded}>
      <h1>Statistics</h1>
      <Paper variant="outlined" className={classes.padded}>
        <h2>Unit 1</h2>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine/>
            </VictoryChart>
          </Grid>
          <Grid item xs={6}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine/>
            </VictoryChart>
          </Grid>
        </Grid>
      </Paper>
      <Paper variant="outlined" className={classes.padded}>
        <h2>Unit 2</h2>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine/>
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
