import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formStyle: {
    maxWidth: 900,
  },
  formProgressBar: {
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  finishButton: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  previewChip: {
    maxWidth: 800,
  },
}));
