import React from 'react'
import { Typography } from '@material-ui/core';
import BottomNavbar from '../BottomNavbar';
import AuthNavbar from '../AuthNavbar';
import { makeStyles, ThemeProvider } from '@material-ui/core';

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

function NotificationPage() {
  const classes = useStyles();
  
  return (
    <div>
        <h1 className={classes.center}>Notifications coming Soon!</h1>
    </div>
  )
}

export default NotificationPage