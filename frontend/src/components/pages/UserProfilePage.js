import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Typography, Paper, Tab, AppBar, makeStyles, Grid, useMediaQuery, useTheme, Box, responsiveFontSizes } from '@material-ui/core'
import { useFetch, useInterval } from '../../util/CustomHooks';
import ProfileHeader from '../ProfileHeader';
import UserGameList from '../UserGameList';
import FriendList from '../FriendList';
import { backendURL } from '../../globals';


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
    
  }
}));

function UserProfilePage() {
  const url = backendURL;
  const storedUsername = localStorage.getItem('username');

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  const [user, setUser] = useState({
    username: new URLSearchParams(window.location.search).get('username') ?
    new URLSearchParams(window.location.search).get('username') : 'Invalid User'
  });

  useEffect(() => {
    let oldURL = `${url}/select_user?username=${user.username}`;
    fetch(oldURL)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(err => console.log(err));
    console.log(user);
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
      <ProfileHeader className={classes.profileHeader} user={user}/>
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
          <UserGameList user={user}/>
        </TabPanel>
        <TabPanel value={currentTab} index={1}>
          {/* Friends panel */}
          <FriendList user={user}/>
        </TabPanel>
      </div>
    </div>
  )
}

export default UserProfilePage
