/*
 *  FriendPage.js
 *  The page that renders on the /games route
 *  accessed from either the "manage your library" button on the main page
 *  or when a user or profile UserGames list cant list any games by showing a link to here.
 *  Shows the logged in users friends and allows the user to interact with them.
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import React from 'react';
import { makeStyles } from '@material-ui/core';
import GamesList from '../GamesList';

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

function GamesPage() {
  const classes = useStyles();

  return (
    <div>
        <h1 className={classes.center}>Select games to add to your library:</h1>
        <GamesList/>
    </div>
  )
}

export default GamesPage