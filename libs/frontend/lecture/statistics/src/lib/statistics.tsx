import {
  Container,
  createStyles,
  List,
  ListItem,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import { VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from 'victory';
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
      <Paper variant="outlined" className={classes.padded}>
        {Object.keys(statistics).map((unitId) => (
          <>
            {Object.keys(statistics[unitId]).length > 0 && (
              <div>
                <h2>{unitId}</h2>
                <Paper style={{ overflow: 'auto' }}>
                  <List style={{ display: 'flex', flexDirection: 'row' }}>
                    <ListItem>
                      {Object.keys(statistics[unitId]).map((quizId) => (
                        <List>
                          {statistics[unitId][quizId].map((quiz) => (
                            <ListItem>
                              {Object.keys(quiz).map((title) => (
                                <VictoryChart theme={VictoryTheme.material}>
                                  <VictoryLabel text={title} />
                                  <VictoryBar
                                    data={quiz[title]}
                                    x="points"
                                    y="count"
                                  />
                                </VictoryChart>
                              ))}
                            </ListItem>
                          ))}
                        </List>
                      ))}
                    </ListItem>
                  </List>
                </Paper>
              </div>
            )}
          </>
        ))}
      </Paper>
    </Container>
  );
}

export default Statistics;
