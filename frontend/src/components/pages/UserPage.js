/*
 *  UserPage.js
 *  The page that renders on the /user route
 *  loads the specified username in the URL search query
 *  not to be confused with the profile page which loads based on the logged in user
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Tabs, Typography, Tab, makeStyles, Grid, useMediaQuery, useTheme, Box, Button } from '@material-ui/core'
import UserHeader from '../UserHeader';
import UserGameList from '../UserGameList';
import FriendsList from '../FriendsList';
import { backendURL } from '../../globals';
import { useDispatch } from 'react-redux';
import { sendAlert } from '../../actions';


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
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '75%',
    margin: 'auto',
    marginBottom: '2%'
}
}));

function UserPage() {
  const classes = useStyles();

  const [user, setUser] = useState({});

  const [refresh, setRefresh] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    let queryUsername = new URLSearchParams(window.location.search).get('username');
    let username = '';

    if (queryUsername) {
      username = queryUsername;
    }

    let url = `${backendURL}/select_user?username=${username}`;
    fetch(url)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(err => console.log(err));

    return () => {
      setRefresh(!refresh);
    }
  }, [refresh, location.key]);

  async function addFriend(){
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        username: localStorage.getItem('username'),
        friendUsername: user.username
      })
    }

    const response = await fetch(backendURL + "/create_friend", options)

    if (response.ok) {
      dispatch(sendAlert(user.username + ' added to your friends list!', 'success'));
    }
    else {
      dispatch(sendAlert(response.statusText, ''));
    }
  }

  function goToMatch(username) {
    localStorage.setItem("searchParams", user.username);
    history.push({
      pathname: "/match",
      search: `?username=${user.username}`
    });
  }

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
      <h1 className={classes.center}>{user.username}'s Profile</h1>
      { user ? 
      <div>
        <Grid container justify="flex-end" alignItems="flex-end">
          <Button
            style={{marginRight: '10px'}}
            color="primary"
            variant="contained"
            onClick={() => addFriend(user.username)}
          >
            Add Friend
          </Button>
          <Button
            style={{marginRight: '10px'}}
            color="primary"
            variant="contained"
            onClick={() => goToMatch(user.username)}
          >
            Match 
          </Button>
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
            <UserGameList username={user.username} isProfile={false}/>
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            {/* Friends panel */}
            <FriendsList user={user} isProfile={false}/>
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

export default UserPage
