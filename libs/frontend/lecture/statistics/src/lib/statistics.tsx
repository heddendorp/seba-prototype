import {
  Container,
  createStyles,
  Grid,
  List,
  ListItem,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import { VictoryChart, VictoryBar, VictoryLine, VictoryTheme } from 'victory';
import {
  StatisticService,
  LectureService,
  LectureUnitService,
  UserService,
} from '@seba/frontend/api-services';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ILectureUnit, IUser } from '@seba/backend/models';
import _ from 'lodash';
import { stat } from 'node:fs/promises';

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

  const test = (x) => console.log(x);

  return (
    <Container className={classes.padded}>
      <Paper variant="outlined" className={classes.padded}>
        {Object.keys(statistics).map((unitId) => (
          <>
            {Object.keys(statistics[unitId]).length > 0 && (
              <div>
                <h2>{unitId}</h2>
                {Object.keys(statistics[unitId]).map((quizId) => (
                  <div>
                    <List>
                      {statistics[unitId][quizId].map((quiz) => (
                        <ListItem>
                          {Object.keys(quiz).map((title) => (
                            <>
                              <h4>{title}</h4>
                              <VictoryChart>
                                <VictoryBar
                                  data={quiz[title]}
                                  x="points"
                                  y="count"
                                />
                              </VictoryChart>
                            </>
                          ))}
                        </ListItem>
                      ))}
                    </List>
                  </div>
                ))}
              </div>
            )}
          </>
        ))}
      </Paper>
    </Container>
  );
}

export default Statistics;
