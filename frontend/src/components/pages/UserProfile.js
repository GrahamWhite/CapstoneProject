import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Typography, Paper, Tab, AppBar, makeStyles, Grid } from '@material-ui/core'
import { useFetch, useInterval } from '../../util/CustomHooks';
import ProfileHeader from '../ProfileHeader';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  tabBar: {
    display: 'flex',
    justifyContent:'space-even',
    alignItems: 'stretch',
    flexGrow: '1'
  }
}));

function UserProfile() {
  const url = "http://ec2-35-183-39-123.ca-central-1.compute.amazonaws.com:3000";
  const classes = useStyles();
  const storedUsername = localStorage.getItem('username');

  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  const [user, setuser] = useState({
    username: 'tmills9208',
    email: 'tmills9208@conestogac.on.ca',
    bio: 'Hi, i am a person!',
    avatarImg: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png', // basic img placeholder
    socialLinks: {

    },
    games: {

    },
    friends: {

    },
  });

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div>
      <ProfileHeader user={user}/>
      <Paper>
        <Tabs className={classes.tabBar} value={currentTab} onChange={handleChange}>
          <Grid container spacing={1} justify="space-between">
            <Grid item xs={6}>
              <Tab label="Games" {...a11yProps(0)}/>
            </Grid>
            <Grid item xs={6}>
              <Tab label="Friends" {...a11yProps(1)}/>
            </Grid>
          </Grid>
        </Tabs>
      </Paper>
      <div>
        {/* Where games and friends list will be */}
      </div>
    </div>
  )
}

export default UserProfile
