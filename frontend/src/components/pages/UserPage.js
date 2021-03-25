import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Tabs, Typography, Paper, Tab, AppBar, makeStyles, Grid, useMediaQuery, useTheme, Box, responsiveFontSizes } from '@material-ui/core'
import { useFetch, useInterval } from '../../util/CustomHooks';
import UserHeader from '../UserHeader';
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

function UserPage() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const [user, setUser] = useState({});

  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);

  const history = useHistory();

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
    console.log(user);
  }, []);

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
      { user ? 
      <div>
        <Grid container justify="flex-end" alignItems="flex-end">
          
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
            <UserGameList username={user.username}/>
          </TabPanel>
          <TabPanel value={currentTab} index={1}>
            {/* Friends panel */}
            <FriendList user={user}/>
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
