import {
  Container,
  createStyles,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from 'victory';
import { StatisticService } from '@seba/frontend/api-services';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

/* eslint-disable-next-line */
export interface StatisticsProps {}

type StatisticsParams = { lecture_id: string };

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(2),
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      overflow: 'auto',
      maxWidth: '100%',
    },
    chart: {
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      
    },
  })
);

export function Statistics(props: StatisticsProps) {
  const params = useParams<StatisticsParams>();
  const classes = useStyles();

  const [statistics, setStatistics] = useState([]);

  useEffect(() => {
    StatisticService.getByLectureId(params.lecture_id).then((response) => {
      response.json().then((body) => {
        setStatistics(body);
      });
    });
  }, [params.lecture_id]);

  return (
    <Container className={classes.padded}>
      <>
        {Object.entries(statistics).map(([unit, quizzes]) => (
          <Paper variant="outlined" className={classes.padded}>
            <h2>{unit}</h2>
            {Object.entries(quizzes).map(([quizId, questions]) => (
              <div className={classes.row}>
                {Object.entries(questions).map(([text, data]) => (
                  <div className={classes.chart}>
                    <h3 style={{ marginBottom: -16 }}>{text}</h3>
                    <VictoryChart
                      theme={VictoryTheme.material}
                    >
                      <VictoryAxis tickValues={data.map(date => date.points)} tickFormat={data.map(date => date.points+' points')}/>
                      <VictoryAxis dependentAxis tickValues={data.map(date => date.count)}/>
                      <VictoryBar alignment='start' barWidth='25' data={data} x="points" y="count" />
                    </VictoryChart>
                  </div>
                ))}
              </div>
            ))}
          </Paper>
        ))}
      </>
    </Container>
  );
}

export default Statistics;
