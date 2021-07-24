import {createStyles, makeStyles, Theme} from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    padded: {
      padding: theme.spacing(3),
    },
    deleteButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    dButton: {
      //display: "flex",
      //justifyContent: "flex-end",
    },
  })
);
