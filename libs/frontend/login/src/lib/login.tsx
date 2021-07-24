import {Button, Container, Grid, Link, Paper, TextField, Typography,} from '@material-ui/core';

import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Alert} from '@material-ui/lab';
import {useHistory} from 'react-router-dom';
import {StorageService, UserService} from '@seba/frontend/api-services';
import {useStyles} from './styles';

export function Login() {
  const classes = useStyles();
  const logoPath = '/assets/logo.png';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await UserService.login({
      username: username,
      password: password,
    });

    response
      .json()
      .then((body) => {
        if (response.status !== 200) {
          setError(true);
          setErrorMessage(body.message);
        } else {
          setError(false);
          StorageService.setToken(body.token);

          history.push('/app', {
            role: body.user.role,
          });
        }
      })
      .catch((error) => alert(error));
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const getAlert = () => {
    if (error) return <Alert severity="error">{errorMessage}</Alert>;
    return;
  };

  return (
    <Container maxWidth="sm" className={classes.fullHeight}>
      <Grid
        container
        direction="column"
        justify="center"
        className={classes.fullHeight}
      >
        <Grid item>
          <Paper elevation={3} className={classes.padding}>
            <Grid container direction="column" spacing={2} alignItems="center">
              <Grid item>
                <img src={logoPath} alt="Learn with me"/>
              </Grid>
              <Grid item>
                <Typography component="h1" variant="h5">
                  Sign in
                </Typography>
              </Grid>
              <Grid item>
                <form onSubmit={handleSubmit}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Sign In
                  </Button>
                </form>
              </Grid>
              <Grid item>{getAlert()}</Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
