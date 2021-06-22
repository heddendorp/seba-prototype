import {
  Dialog,
  makeStyles,
  Typography,
  IconButton,
  Theme,
  createStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import {ReactNode} from "react";

/* eslint-disable-next-line */
export interface UploadLectureDialogProps {
  children: ReactNode;
  openDialog: boolean;
  setOpenDialog: (b: boolean) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    },
    content: {
      padding: theme.spacing(2)
    }
  }),
);

export function UploadLectureDialog(props: UploadLectureDialogProps) {

  const {children, openDialog, setOpenDialog} = props;
  const classes = useStyles();

  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <Dialog open={openDialog} maxWidth="md" aria-labelledby="customized-dialog-title">
      <MuiDialogTitle disableTypography className={classes.title} id="customized-dialog-title">
        <Typography variant="h6">Upload lecture</Typography>
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={handleClose}>
          <CloseIcon/>
        </IconButton>
      </MuiDialogTitle>
      <MuiDialogContent dividers className={classes.content}>
        {children}
      </MuiDialogContent>
    </Dialog>
  );
}

export default UploadLectureDialog;
