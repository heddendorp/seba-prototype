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

/* eslint-disable-next-line */
export interface StatisticsProps {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(2),
    },
  })
);

export function Statistics(props: StatisticsProps) {
  const classes = useStyles();
  return (
    <Container className={classes.padded}>
      <h1>Statistics</h1>
      <Paper variant="outlined" className={classes.padded}>
        <h2>Unit 1</h2>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine />
            </VictoryChart>
          </Grid>
          <Grid item xs={6}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine />
            </VictoryChart>
          </Grid>
        </Grid>
      </Paper>
      <Paper variant="outlined" className={classes.padded}>
        <h2>Unit 2</h2>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine />
            </VictoryChart>
          </Grid>
          <Grid item xs={6}>
            <VictoryChart theme={VictoryTheme.material}>
              <VictoryLine />
            </VictoryChart>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Statistics;
