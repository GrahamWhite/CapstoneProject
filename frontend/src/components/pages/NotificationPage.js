/*
 *  NotificationPage.js
 *  The page that renders on the /notification route
 *  This is an incomplete feature and is currently replaced by the AlertSnackbar
 *  component in order to let users know of any updates to their account, games, friends, etc.
 *
 *  Revision History
 *      Lynn Varga, 4-20-2021: Init
 */

import React from 'react'
import { makeStyles } from '@material-ui/core';

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