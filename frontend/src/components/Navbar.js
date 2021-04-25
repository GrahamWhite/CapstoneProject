/*
 *  Navbar.js
 *  Initial top navigation bar when the user is not logged in.
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();
  const loggedIn = useSelector(state => state.loggedIn);

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            {/* <MenuIcon/> */}
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Tink
          </Typography>
          { loggedIn ? 'Logged in as: user' : <Button component={Link} to={"/login"} color="inherit">Login</Button>}
          <Button component={Link} to={"/register"} color="inherit">Register</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
