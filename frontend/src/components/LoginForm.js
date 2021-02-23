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
import { Link, useHistory } from "react-router-dom";

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
  // Note: Find a global place to store server url for repeated use.
  const url =
    "http://ec2-35-183-39-123.ca-central-1.compute.amazonaws.com:3000";

  // Hooks
  const [formInfo, setFormInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  // Helps with programatically changing what page you're on
  let history = useHistory();

  // Custom CSS
  const classes = useStyles();

  //Events
  function onChange(i) {
    setFormInfo({ ...formInfo, [i.target.name]: i.target.value });
    handleValidation();
    console.log(formInfo);
  }

  function validateUsername() {
    let isValid = true;

    if (!formInfo["username"]) {
      isValid = false;
      setErrors["username"] = "Cannot be empty";
    }

    if (!formInfo["username"]) {
      if (!formInfo["username"].match(/^[a-zA-Z]+$/)) {
        if (isValid) setErrors["username"] = "Only letters, numbers and underscores";
        isValid = false;
      }
    }

    return isValid;
  }

  function validateEmail() {
    let isValid = true;

    if (!formInfo["email"]) {
      isValid = false;
      setErrors["email"] = "Cannot be empty";
    }

    if (formInfo["email"] !== "undefined") {
      let lastAtPos = formInfo["email"].lastIndexOf("@");
      let lastDotPos = formInfo["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          formInfo["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          formInfo["email"].length - lastDotPos > 2
        )
      ) {
        if (isValid) {
          setErrors["email"] = "Email is not valid";
          isValid = false;
        }
      }
    }

    return isValid;
  }

  function handleValidation() {
    let formIsValid = true;

    // Username
    formIsValid = validateUsername();

    // Email
    formIsValid = validateEmail();

    return formIsValid;
  }

  async function handleSubmit(e) {
    let isValid = false;
    if (e) e.preventDefault();
    isValid = handleValidation();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formInfo),
    };

    let responseData = "";
    try {
      let response = await fetch(url + "/user", options);
      responseData = await response.json();
      isValid = true;
    } catch (err) {
      console.log(err);
    }

    console.log(isValid);
    console.log(responseData);
    if (isValid) {
      history.push("/login");
    }
  }

  return (
    <Container className={classes.root} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box
          display="flex"
          width={"1"}
          alignItems="center"
          justifyContent="left"
        >
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography
            component="h1"
            variant="h5"
            style={{ marginTop: ".5rem" }}
          >
            Login
          </Typography>
        </Box>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={onChange}
                error={errors['username'] != ""}
                helperText={""}
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
