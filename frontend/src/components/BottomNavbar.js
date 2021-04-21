/*
 *  AlertSnackbar.js
 *  Bottom nav bar that is render when logged in
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useLocation } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import { useMediaQuery, useTheme } from '@material-ui/core';
//import {HomeIcon, HistoryIcon, PersonIcon} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  bottomNavbar:{
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: '100%',
    position: 'fixed',
    bottom: 0,
    ':hover' : {
        backgroundColor: theme.palette.primary.light
    }

  },
  icon:{
    fill: theme.palette.primary.contrastText
  }

}));

//under construction 
function BottomNavbar(){
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const location = useLocation();
    // console.log(location);

    const [currentTab, setCurrentTab] = useState(0);
    const [value, setValue] = React.useState(0);

    useEffect(() => {
      const pathname = location.pathname.toLowerCase();
      if (pathname.includes('profile'))
        setCurrentTab('profile');
      else if (pathname.includes('friend'))
        setCurrentTab('friend');
      else if (pathname.includes('search'))
        setCurrentTab('search');
      else if (pathname.includes('main'))
        setCurrentTab('main');
      else
        setCurrentTab('main');
    }, [location])

    return(
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          values={currentTab}
          showLabels={!matches}
          className={classes.bottomNavbar}
        >
          <BottomNavigationAction 
            value={'main'}
            component={Link} to={"/main"}
            label={"Home"}
            icon={<HomeIcon className={classes.icon}/>}
            />
          <BottomNavigationAction 
            value={'search'}
            component={Link} to={"/search"} 
            label={"Search"}
            icon={<SearchIcon className={classes.icon}/>}
            />
          <BottomNavigationAction 
            value={'friend'}
            component={Link} to={"/friend"}
            label={"Friends"} 
            icon={<PeopleIcon className={classes.icon}/>}
            />
          <BottomNavigationAction 
            value={'profile'}
            component={Link} to={"/profile"} 
            label={"Profile"}
            icon={<PersonIcon className={classes.icon}/>}
            />
        </BottomNavigation>
        )
}

export default BottomNavbar;




