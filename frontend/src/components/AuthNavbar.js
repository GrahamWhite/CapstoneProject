import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { Link, useHistory } from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from 'react-redux';
import HelpIcon from '@material-ui/icons/Help';
import { sendAlert, signOut } from '../actions';

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
    dispatch(signOut());
    dispatch(sendAlert('Successfully logged out!', 'success'));
    history.push('/login');
  }

  return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon/>
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            Tink
          </Typography>
          <Button onClick={logout} color="inherit">Logout</Button>
          <Button component={Link} to={"/help"} color="inherit"><HelpIcon/></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AuthNavbar;
