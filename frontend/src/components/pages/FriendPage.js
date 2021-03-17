import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core';
//import Typography from '@material-ui/core/Typography'
import BottomNavbar from '../BottomNavbar';
import AuthNavbar from '../AuthNavbar';
import FriendList from '../FriendList';

const useStyles = makeStyles((theme) => ({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '75%',
        margin: 'auto',
        marginBottom: '2%'
    }
    }));

function FriendPage() {
  const classes = useStyles();

  return (
    <div>
        <h1 className={classes.center}>Friends list coming Soon!</h1>
        <FriendList/>
    </div>
  )
}

export default FriendPage
