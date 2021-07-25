import { createStyles, makeStyles, Theme } from '@material-ui/core';

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
      textAlign: 'right',
    },
    receivedMessage: {
      display: 'flex',
      textAlign: 'left',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gridTemplateRows: 'auto auto auto min-content ',
      gridTemplateAreas:
        '"title title" "video group" "description group" "questions chat"',
      gridGap: '1rem',
      padding: theme.spacing(6),
    },
  })
);
