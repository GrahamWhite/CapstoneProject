import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Alert } from '@material-ui/lab';
import { Link, useHistory } from "react-router-dom";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { backendURL } from "../globals";
import { sendAlert, signIn } from "../actions";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "none",
    color: "black",
  },
  paper: {
    marginTop: theme.spacing(1.5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function LoginForm() {
  // Constants
  const url = backendURL;

  // Hooks
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  // Helps with programatically changing what page you're on
  let history = useHistory();

  // Custom CSS
  const classes = useStyles();

  //Events
  async function sendToServer(values) {
    setError("");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(values)
    };

    const response = await fetch(url + "/login", options);
    // console.log(response);

    if (response.ok) {
      const responseData = await response.json();
      localStorage.setItem('username', responseData.user.username);
      dispatch(signIn());
      dispatch(sendAlert('Successfully logged in as ' + localStorage.getItem('username'), 'success'))
      history.push("/main");
    }
    else {
      dispatch(sendAlert(response.error, "error"));
    }
  }

  const validationSchema = yup.object({
    username: yup
      .string('Username must be a string')
      .min(5, 'Username must be at least 5 characters long')
      .max(30, "Username cannot be more then 30 characters")
      .required('Enter your username'),
    password: yup
      .string('Enter a new password')
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // console.log(values);
      // console.log(JSON.stringify(values));
      sendToServer(values);
    }
  })
  
  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
          >
            Login
          </Typography>
          { error ? 
          <Alert severity="error">{error}</Alert>
          : null }
        <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            size="large"
          >
            Login
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            to={"/register"}
          >
            Dont have an account? Sign Up
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default LoginForm;
