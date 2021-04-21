/*
 *  MainPage.js
 *  The page that renders on the /match route
 *  The user is taken here upon logging in and acts as a home page to access site functionality
 *  not present in the bottom navigation bar.
 *
 *  Revision History
 *      Lynn Varga, 4-20-2021: Init
 */

import React, { useState } from 'react';
import { makeStyles, Grid } from '@material-ui/core'
import MatchHeader from '../MatchHeader';
import MatchList from '../MatchList';

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  profileHeader: {
    padding: '10px'
  },
  tabPanelsContainer: {
    marginBottom: '100px'
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    margin: 'auto',
    marginBottom: '2%'
}
}));

function MatchPage() {
  const classes = useStyles();

  const [user] = useState({
    username: localStorage.getItem('username') ? localStorage.getItem('username') : 'Invalid User',
    avatarImg: 'https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg', // basic img placeholder
  });
  const [matchedUser] = useState({
    username: new URLSearchParams(window.location.search).get('username') ?
      new URLSearchParams(window.location.search).get('username') : 'Invalid User 2',
    avatarImg: 'https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg', // basic img placeholder,
  });

  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
        <MatchHeader user={user} matchedUser={matchedUser}/>
        </Grid>
        <Grid item xs={12}>
          <MatchList/>
        </Grid>
      </Grid>
    </div>
  )
}

export default MatchPage