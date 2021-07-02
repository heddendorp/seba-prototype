import {Button, Container, CssBaseline, Grid, Link, MenuItem, Select, TextField, Typography} from "@material-ui/core";
import React, {ChangeEvent, FormEvent, useState} from "react";
import {useStyles} from "./styles";
import {UserService} from "@seba/api-services";
import {Alert} from "@material-ui/lab";
import {Role} from "@seba/models";

export function SignUp() {
  const classes = useStyles();
  const logoPath = "/assets/logo.png";

  const [display_name, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(Role.STUDENT);

  type Color = "error" | "info" | "success" | "warning";

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<Color>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await UserService.register({
      display_name: display_name,
      username: username,
      password: password,
      role: role
    });

    response.json().then(body => {
      setMessage(body.message);
      if (response.status !== 201) {
        setSeverity("error");
      } else {
        setSeverity("success");
      }
    }).catch(error => alert(error));
  }

  const onChangeDisplayName = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value)
  }

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  function onChangeRole(event: ChangeEvent<{ name?: string | undefined; value: unknown; }>) {
    setRole(event.target.value as Role);
  }

  const getAlert = () => {
    if (message !== "")
      return (
        <Alert className={classes.form} severity={severity}>{message}</Alert>
      );
    return;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <img className={classes.logo} src={logoPath} alt="Learn with me"/>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Display Name"
                autoFocus
                onChange={onChangeDisplayName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Username"
                autoComplete="username"
                onChange={onChangeUsername}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                onChange={onChangePassword}
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
                  <Select defaultValue={Role.STUDENT} className={classes.select} onChange={onChangeRole}>
                    <MenuItem value={Role.STUDENT}>Student</MenuItem>
                    <MenuItem value={Role.LECTURER}>Lecturer</MenuItem>
                  </Select>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {getAlert()}
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
