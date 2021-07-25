import {
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Link,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useStyles } from './styles';
import { UserService } from '@seba/frontend/api-services';
import { Alert } from '@material-ui/lab';
import { Role } from '@seba/backend/models';

export function SignUp() {
  const classes = useStyles();
  const logoPath = '/assets/brainstorm.svg';

  const [display_name, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(Role.STUDENT);

  type Color = 'error' | 'info' | 'success' | 'warning';

  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<Color>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await UserService.register({
      display_name: display_name,
      username: username,
      password: password,
      role: role,
    });

    response
      .json()
      .then((body) => {
        setMessage(body.message);
        if (response.status !== 201) {
          setSeverity('error');
        } else {
          setSeverity('success');
        }
      })
      .catch((error) => alert(error));
  };

  const onChangeDisplayName = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  function onChangeRole(
    event: ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) {
    setRole(event.target.value as Role);
  }

  const getAlert = () => {
    if (message !== '')
      return (
        <Alert className={classes.form} severity={severity}>
          {message}
        </Alert>
      );
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
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={logoPath}
                    alt="Learn with me"
                    style={{ marginRight: 16 }}
                  />
                  <Divider orientation="vertical" flexItem />
                  <Typography
                    variant="h4"
                    style={{ fontWeight: 'bold', marginLeft: 16 }}
                  >
                    Learn <br />
                    With <br />
                    Me
                  </Typography>
                </div>
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
                    label="Display Name"
                    autoFocus
                    onChange={onChangeDisplayName}
                  />
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
                    label="Username"
                    autoComplete="username"
                    onChange={onChangeUsername}
                  />
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    margin="normal"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={onChangePassword}
                  />
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="role-select-label">Role</InputLabel>
                    <Select
                      defaultValue={Role.STUDENT}
                      labelId="role-select-label"
                      onChange={onChangeRole}
                    >
                      <MenuItem value={Role.STUDENT}>Student</MenuItem>
                      <MenuItem value={Role.LECTURER}>Lecturer</MenuItem>
                    </Select>
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Sign Up
                  </Button>
                </form>
              </Grid>
              <Grid item>{getAlert()}</Grid>
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
