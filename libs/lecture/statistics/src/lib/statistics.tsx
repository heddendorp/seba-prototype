import './statistics.module.scss';
import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
} from '@material-ui/core';
import { VictoryChart, VictoryLine, VictoryTheme } from 'victory';
import { LectureUnitService, IStatistic } from "@seba/api-services"
import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
//LectureService

/* eslint-disable-next-line */
export interface StatisticsProps {}
type StatisticsParams = { unit_id: string }

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

  const [Title, setTitle] = useState();

  useEffect(() => {
    console.log(params.unit_id)
    const getLectureUnit = async () => await LectureUnitService.getById(params.unit_id);
    
    getLectureUnit().then(unit => {
      setTitle(unit.title)
    });
  }, [params.unit_id]);

  useEffect(() => {
    console 

  });

  return (
    <Container className={classes.padded}>
      <h1>Statistics</h1>
      
      <Paper variant="outlined" className={classes.padded}>
        <h2>{Title}</h2>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <VictoryChart theme={VictoryTheme.material}> 
              <VictoryLine 
                data={[[0, 1], [1, 1], [2, 3], [3, 1]]}
                x={0}
                y={1}
              />
            </VictoryChart>
          </Grid>
          <Grid item xs={6}>
            <VictoryChart theme={VictoryTheme.material}>
              const array
              <VictoryLine />
            </VictoryChart>
          </Grid>
        </Grid>
      </Paper> 
    </Container>
  );
}

export default Statistics;
