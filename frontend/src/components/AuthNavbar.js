import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { ReAuthenticate } from '../globals';

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

function AuthNavbar(props) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    localStorage.setItem('username', '');
    dispatch({
      type: 'SIGN_OUT'
    });
    history.push('/login');
  }

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
          <Button onClick={logout} color="inherit">Logout</Button>
          {/* <NotificationsIcon/> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AuthNavbar;
