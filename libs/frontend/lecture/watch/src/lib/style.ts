import {createStyles, makeStyles, Theme} from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    hideOverflow: {
      overflow: 'hidden',
    },
    padded: {
      padding: theme.spacing(2),
    },
    sentMessage: {
      display: 'flex',
      textAlign: 'right'
    },
    receivedMessage: {
      display: 'flex',
      textAlign: 'left'
    }
    /*     root: {
      font: 'Roboto',
      display: 'flex',
      flexDirection: 'row',
    },
    chat: {
      padding: theme.spacing(2),
      border: '1px solid black',
      borderRadius: 3,
      backgroundColor: '#d3d3d3',
      width: '75%',
    },
    media: {
      width: '97%',

    },
    doubts: {
      padding: theme.spacing(2),
      font: 'Calibri',
      backgroundColor: '#ffffff',
      width: '97%',
    },
    groups: {
      padding: theme.spacing(3),
      border: '1px solid black',
      borderRadius: 3,
      backgroundColor: '#d3d3d3',
      width: '75%',
      height: '10 px',
    } */
  })
);
