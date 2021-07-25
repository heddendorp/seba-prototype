import {createStyles, makeStyles, Theme} from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    padded: {
      padding: theme.spacing(3, 3, 2),
    },
    sizingView: {
      maxWidth: 900,
    },
    deleteButton: {
      bottom: theme.spacing(1)
    },
    editButton: {
      marginTop: theme.spacing(1)
    },
    paper: {
      padding: theme.spacing(1),
      margin: theme.spacing(1,0,1,0),
      backgroundColor: '#00796b',
    },
    questionInput: {
      backgroundColor: '#FFFFFF'
    },
    modifyButton: {
      borderColor: '#FFFFFF',
      color: '#FFFFFF',
    },
    modifyButtons : {
      marginTop: theme.spacing(1),
    },
    answerContent : {
      display: 'flex',
    },
    questionDialog: {
      maxWidth: 700,
    },
    createQuizButton: {
      margin: theme.spacing(1, 0, 1, 0),

    }

  })
);
