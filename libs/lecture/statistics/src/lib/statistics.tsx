import './statistics.module.scss';
import {
  Container,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@material-ui/core';
import { VictoryBar, VictoryChart, VictoryLine, VictoryTheme } from 'victory';
//import * as _lod from "lodash";
import { ILecture } from '@seba/models';
import { StatisticService, LectureService, LectureUnitService } from "@seba/api-services"
import { useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import { Script } from 'node:vm';
//LectureService

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

  const [lectTitle, setlectTitle] = useState();
  //const [unitTitle, setunitTitle] = useState();
  const [units, setunits] = useState();


  useEffect(() => {
    const Stats = async () => await StatisticService.getById(params.lecture_id);
    console.log(Stats);
    
    const getLecture = async () => await LectureService.getById(params.lecture_id);
    getLecture().then(lecture => {
      setlectTitle(lecture.title)
      setunits(lecture.units)
    });
    
  }, [params.lecture_id]);

//lecture is saved in lecture
//lecture title in lecture.title

//Stats.


  return (
//    <div><h2>{lectTitle}</h2>
  //    <h1>Statistics</h1>
  //  </div>
    
//    units.forEach(unit_id => {
 //     LectureUnitService.getById(unit_id).then((unit) => {
  //      unit.quizzes.forEach(quiz_id => {
          <Container className={classes.padded}>
            
            <Paper variant="outlined" className={classes.padded}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <VictoryChart theme={VictoryTheme.material}> 
                    <VictoryBar 
                       data = {Stats}
                       x=''
                       y=''
                    />
                  </VictoryBar>
                </Grid>
                <Grid item xs={6}>
                </Grid>
              </Grid>
            </Paper> 
          </Container>


        
    
  );

}

export default Statistics;
