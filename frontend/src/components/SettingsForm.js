import React, { useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { backendURL, ReAuthenticate } from '../globals';
import { useHistory } from 'react-router';
import { Container, CssBaseline, Grid, makeStyles, Paper, Button, TextField, Avatar, Typography, TextareaAutosize } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';

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

function SettingsForm({ user }) {

  const classes = useStyles();

  const [message, setMessage] = useState('');

  //Events
  async function sendToServer(values) {
    setMessage('');

    if (!localStorage.getItem('username')){
      ReAuthenticate();
    }

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
      let response = await fetch(backendURL + "/update_user", options);
      responseData = await response.json();
      isValid = true;
    } catch (err) {
      console.log(err);
      setMessage('Error! Something went wrong');
    }

    if (isValid) {
      setMessage('Changes successfully saved!');
      //dispatch(signIn);
    }
  }

  const validationSchema = yup.object({
    bio: yup
      .string('must be a string')
      .max(200, 'can only be up to 200 characters'),
    email: yup
      .string('Enter a new password')
      .email('must be a valid email')
      .required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      bio: user.bio,
      email: user.email
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      console.log(JSON.stringify(values));
      sendToServer(values);
    }
  })

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <SettingsIcon />
        </Avatar>
        <Typography
          component="h1"
          variant="h5"
        >
          Settings
        </Typography>
        <form className={classes.form} action={formik.onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="bio"
                label="bio"
                fullWidth
                multiline
                variant='outlined'
                rows={3}
                rowsMax={3}
                value={formik.values.bio}
                onChange={formik.handleChange}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="email"
                label="email"
                fullWidth
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
          >
            Save Changes
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default SettingsForm


