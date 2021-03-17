import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core';
//import Typography from '@material-ui/core/Typography'
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
        {/* <GamesList/> */}
    </div>
  )
}

export default GamesPage