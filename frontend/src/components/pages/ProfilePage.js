import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Typography, Paper, Tab, AppBar, makeStyles, Grid, useMediaQuery, useTheme, Box } from '@material-ui/core'
import { useFetch, useInterval } from '../../util/CustomHooks';
import ProfileHeader from '../ProfileHeader';
import UserGameList from '../UserGameList';
import FriendList from '../FriendList';


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

function UserProfile() {
  const url = "http://ec2-35-183-39-123.ca-central-1.compute.amazonaws.com:3000";
  const storedUsername = localStorage.getItem('username');

  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  const [user, setuser] = useState({
    username: 'tmills9208',
    email: 'tmills9208@conestogac.on.ca',
    bio: 'Hi, i am a person!',
    avatarImg: 'https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg', // basic img placeholder
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

export default UserProfile
