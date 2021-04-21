/*
 *  RegisterForm.js
 *  The register form to create a new account in. 
 *  Upon successful registration, the user is redirected to the login page.
 *  This uses formik for form handling and yup for validation.
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { backendURL } from "../globals";
import { useDispatch } from "react-redux";
import { sendAlert } from "../actions";

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

function RegisterForm() {
  // Constants
  const url = backendURL;

  // Helps with programatically changing what page you're on
  const history = useHistory();

  const dispatch = useDispatch();

  // Custom CSS
  const classes = useStyles();

  async function sendToServer(values) {
    let isValid = false;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(values)
    };

    let responseData = "";
    try {
      let response = await fetch(url + "/create_user", options);
      responseData = await response.json();
      isValid = true;
    } catch (err) {
      console.log(err);
    }

    if (isValid) {
      localStorage.setItem('username', responseData.username);
      dispatch(sendAlert(values.username + ' registered!', 'success'));
      history.push("/login");
    }
    else {
      dispatch(sendAlert('Failed to register user', 'error'));
    }
  }

  const validationSchema = yup.object({
    username: yup
      .string('Username must be a string')
      .min(5, 'Username must be at least 5 characters long')
      .max(30, "Username cannot be more then 30 characters")
      .required('Enter your username'),
    email: yup
      .string('Enter your email')
      .email('Must be a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter a new password')
      .min(8, 'Password must be at least 8 characters long')
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
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
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
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
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                autoComplete="new-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            size="large"
            onClick={formik.onSubmit}
          >
            Create Account
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            to={"/login"}
          >
            Already have an account? Sign in
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default RegisterForm;
