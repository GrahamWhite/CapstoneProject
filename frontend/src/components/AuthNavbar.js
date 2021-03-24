import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import { useSelector } from 'react-redux';
import NotificationsIcon from '@material-ui/icons/Notifications';

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

function AuthNavbar() {
  const classes = useStyles();
  const loggedIn = useSelector(state => state.loggedIn);

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Tink
          </Typography>
          <Button component={Link} to={"/login"} color="inherit">Logout</Button>
          {/* <NotificationsIcon/> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AuthNavbar;
