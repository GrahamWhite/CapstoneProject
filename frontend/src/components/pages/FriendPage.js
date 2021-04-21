/*
 *  FriendPage.js
 *  The page that renders on the /friend route
 *  accessed by clicking the people icon in the bottom navigation
 *  Shows the logged in users friends and allows the user to interact with them.
 *
 *  Revision History
 *      Lynn Varga, 4-20-2021: Init
 */

import React from 'react';
import { makeStyles } from '@material-ui/core';
import FriendsList from '../FriendsList';

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
        <h1 className={classes.center}>My Friends</h1>
        <FriendsList isProfile={true}/>
    </div>
  )
}

export default FriendPage
