import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Typography, Paper, Tab, AppBar, makeStyles, Grid, useMediaQuery, useTheme, Box } from '@material-ui/core'
import BottomNavbar from '../BottomNavbar';
import AuthNavbar from '../AuthNavbar';
import MatchHeader from '../MatchHeader';
import UserGameList from '../UserGameList';
import { backendURL } from '../../globals';
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
  const url = "http://ec2-35-183-39-123.ca-central-1.compute.amazonaws.com:3000";
  const storedUsername = localStorage.getItem('username');

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  const [user, setUser] = useState({
    username: localStorage.getItem('username') ? localStorage.getItem('username') : 'invalid user',
    // email: 'tmills9208@conestogac.on.ca',
    // bio: 'Hi, i am a person!',
    avatarImg: 'https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg', // basic img placeholder

  });

  const [matchedUser, setMatchedUser] = useState({
    username: new URLSearchParams(window.location.search).get('username') ?
      new URLSearchParams(window.location.search).get('username') : 'invalid user 2',
    // email: 'notaemail@gmail.com',
    // bio: "I'm a gamer and I love games",
    avatarImg: 'https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg', // basic img placeholder,
    
  });

  useEffect(() => {
    //fetch(backendURL + '/user')
  }, [])

  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={12}>
        <MatchHeader user={user} matchedUser={matchedUser}/>
        </Grid>
        <Grid item xs={12}>
        <Typography variant="h5" className={classes.center}>{user.username} + {matchedUser.username}</Typography>
        <Typography variant="h5" className={classes.center}>You have {'xx'} games in common!</Typography>
        {/* <h1 className={classes.center}>{user.username} + {matchedUser.username}</h1> */}
        </Grid>
        <Grid item xs={12}>
          <MatchList/>
        </Grid>
      </Grid>
    </div>
  )
}

export default MatchPage