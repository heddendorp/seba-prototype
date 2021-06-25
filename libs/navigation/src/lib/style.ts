import {makeStyles} from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  drawer: {
    width: "15%",
    flexShrink: 0
  },
  paper: {
    width: "15%"
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(2)
  },
  logo: {
    width: "80%"
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2)
  }
}));
