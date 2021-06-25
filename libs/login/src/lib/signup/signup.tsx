import {
  Button,
  Container,
  CssBaseline,
  Grid, Input,
  Link,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography
} from "@material-ui/core";
import logo from "../logo.png";
import React from "react";

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    logo: {
      marginBottom: theme.spacing(5)
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    role: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6)
    },
    select: {
      width: "100%"
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export function SignUp() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img className={classes.logo} src={logo}/>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate action="http://localhost:3333/user/register" method="POST">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="display_name"
                variant="outlined"
                required
                fullWidth
                id="display_name"
                label="Display Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container className={classes.role}>
                <Grid item xs={12} sm={4}>
                  <Typography>
                    Role:
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={8}>
                  <Select name="role" defaultValue={0} input={<Input id="role"/>} className={classes.select}>
                    <MenuItem value={0}>Student</MenuItem>
                    <MenuItem value={1}>Lecturer</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
