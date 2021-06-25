/* eslint-disable-next-line */
import {
  Button,
  Container,
  CssBaseline, Link,
  makeStyles, TextField,
  Typography
} from "@material-ui/core";

import logo from "./logo.png";
import React, {ChangeEvent, FormEvent, useState} from "react";
import { Alert } from '@material-ui/lab';
import {useHistory} from "react-router-dom";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
}));

export function Login() {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    fetch("http://localhost:3333/user/login", {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: new Headers()
    }).then(response => {
      if (response.status !== 200) {
        response.text().then(text =>  {
          setError(true);
          setErrorMessage(JSON.parse(text).message);
        });
      }

      setError(false);
      response.text().then(text => {
        const body = JSON.parse(text);

        history.push("/home", {
          role: body.user.role
        });
      });
    }).catch(error => alert(error));
  }

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const getAlert = () => {
    if (error)
      return (
        <Alert className={classes.form} severity="error">{errorMessage}</Alert>
      );
    return;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img className={classes.logo} src={logo}/>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            autoComplete="username"
            onChange={onChangeUsername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={onChangePassword}
          />
          {getAlert()}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Link href="signup" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </form>
      </div>
    </Container>
  );
}

export default Login;
