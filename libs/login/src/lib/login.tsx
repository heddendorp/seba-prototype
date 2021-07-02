import {Button, Container, CssBaseline, Link, TextField, Typography} from "@material-ui/core";

import React, {ChangeEvent, FormEvent, useState} from "react";
import {Alert} from '@material-ui/lab';
import {useHistory} from "react-router-dom";
import {StorageService, UserService} from "@seba/api-services";
import {useStyles} from "./styles";

export function Login() {
  const classes = useStyles();
  const logoPath = "/assets/logo.png";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await UserService.login({username: username, password: password});

    response.json().then(body => {
      if (response.status !== 200) {
        setError(true);
        setErrorMessage(body.message);
      } else {
        setError(false);
        StorageService.setToken(body.token)

        history.push("/home", {
          role: body.user.role
        });
      }
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
      <CssBaseline/>
      <div className={classes.paper}>
        <img className={classes.logo} src={logoPath} alt="Learn with me"/>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            required
            fullWidth
            label="Username"
            autoFocus
            autoComplete="username"
            onChange={onChangeUsername}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
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
