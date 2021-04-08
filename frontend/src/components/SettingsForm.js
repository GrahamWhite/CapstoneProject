import React, { useState, useEffect } from 'react';
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

function SettingsForm(props) {

  const classes = useStyles();
  const history = useHistory();

  const [message, setMessage] = useState('');
  const [user, setUser] = useState({});

  const storedUsername = localStorage.getItem('username');
  
  //Events
  async function sendToServer(values) {
    setMessage('');
    console.log(values);

    if (!storedUsername){
      ReAuthenticate(props);
    }

    let isValid = false;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(values)
    };

    console.log(values);

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

  useEffect(() => {
    if (!storedUsername) {
      history.push('/login');
    }

    let url = `${backendURL}/select_user?username=${storedUsername}`;
    fetch(url)
      .then(response => response.json())
      .then(data => { setUser(data); console.log(data); })
      .catch(err => console.log(err));
    console.log(user);
  }, [])

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
    enableReinitialize: true,
    initialValues: {
      username: storedUsername,
      bio: user.bio ? user.bio : '' , 
      email: user.email ? user.email : ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
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
                InputLabelProps={{shrink: true}}
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
                InputLabelProps={{shrink: true}}
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
          <Grid
            container
            spacing={1}
            direction="row"
            justify="space-between"
            alignItems="stretch"
            alignContent="center"
            wrap="nowrap"
          >
            <Grid item sm={6} xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                size="large"
                onClick={formik.submitForm}
              >
                Save Changes
              </Button>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                fullWidth
                type="reset"
                variant="contained"
                color="primary"
                className={classes.submit}
                size="large"
                onClick={formik.resetForm}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => history.push('/profile')}
          >
            Go back to profile
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default SettingsForm


