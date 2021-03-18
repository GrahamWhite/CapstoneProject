import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
//import {HomeIcon, HistoryIcon, PersonIcon} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  bottomNavbar:{
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    width: '100%',
    position: 'fixed',
    bottom: 0,
  },
  icon:{
    fill: theme.palette.primary.contrastText
  }
}));

//under construction 
function BottomNavbar(){
    const classes = useStyles();
    return(
        <BottomNavigation
          // value={value}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
          showLabels
          className={classes.bottomNavbar}
        >
          <BottomNavigationAction component={Link} to={"/main"} icon={<HomeIcon className={classes.icon}/>}/>
          <BottomNavigationAction component={Link} to={"/notification"} icon={<NotificationsIcon className={classes.icon}/>}/>
          <BottomNavigationAction component={Link} to={"/friend"} icon={<PeopleIcon className={classes.icon}/>}/>
          <BottomNavigationAction component={Link} to={"/user"} icon={<PersonIcon className={classes.icon}/>}/>
        </BottomNavigation>
        )
}

export default BottomNavbar;




