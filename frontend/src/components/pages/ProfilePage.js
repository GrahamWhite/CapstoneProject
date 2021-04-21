/*
 *  ProfilePage.js
 *  The page that renders on the /profile route
 *  Unlike the User page, the profile page renders separate options 
 *  tailored to the logged in and authorized user.
 *
 *  Revision History
 *      Lynn Varga, 4-20-2021: Init
 */

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Tabs, Typography, Tab, makeStyles, Grid, useTheme, Box, IconButton } from '@material-ui/core'
import UserHeader from '../UserHeader';
import UserGameList from '../UserGameList';
import FriendsList from '../FriendsList';
import { backendURL } from '../../globals';
import SettingsIcon from '@material-ui/icons/Settings';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          {children}
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  profileHeader: {
    padding: '10px'
  },
  tabPanelsContainer: {
    
  },
  settingsButton: {
    right: '3%'
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    margin: 'auto',
}
}));

function ProfilePage() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  const [currentTab, setCurrentTab] = useState(0);
  const [user, setUser] = useState({});

  useEffect(() => {
    let storedUsername = localStorage.getItem('username');
    let username = '';

    if (storedUsername) {
      username = storedUsername;
    }
    else {
      history.push('/login');
    }

    let url = `${backendURL}/select_user?username=${username}`;
    fetch(url)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(err => console.log(err));
  }, [])

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  }

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  return (
    <div>
      { user ? 
        <div>          
          <Grid container justify="flex-end" alignItems="flex-end">
          <h1 className={classes.center}>My Profile</h1>
            <IconButton
              className={classes.settingsButton}
              tooltip="Settings"
              size='large'
              onClick={() => history.push('/settings')}>
              <SettingsIcon/>
            </IconButton>
          </Grid>
          <UserHeader className={classes.profileHeader} user={user}/>
          <Tabs className={classes.tabBar} 
            value={currentTab}
            variant="fullWidth"
            onChange={handleChange}>
            <Tab label="Games" {...a11yProps(0)}/>
            <Tab label="Friends" {...a11yProps(1)}/>
          </Tabs>
          <div className={classes.tabPanelsContainer}>
            <TabPanel value={currentTab} index={0}>
              {/* Games panel */}
              <UserGameList username={user.username} isProfile={true}/>
            </TabPanel>
            <TabPanel value={currentTab} index={1}>
              {/* Friends panel */}
              <FriendsList username={user} isProfile={true}/>
            </TabPanel>
          </div>
        </div>
        :
        <div>
          <Typography variant="h4" color="initial">Loading...</Typography>
        </div>
      }
    </div>
  )
}

export default ProfilePage
