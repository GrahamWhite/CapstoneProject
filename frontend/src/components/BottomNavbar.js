import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import HistoryIcon from '@material-ui/icons/History';
import PersonIcon from '@material-ui/icons/Person';
//import {HomeIcon, HistoryIcon, PersonIcon} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  bottomNavbar:{
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    top: 'auto',
    bottom: 0,
  },
  icon:{
    fill: theme.palette.primary.contrastText,
  },
  navAction:{
    color: theme.palette.primary.contrastText,
  },
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
          <BottomNavigationAction component={Link} to={""} label="Home" icon={<HomeIcon className="icon"/>} />
          <BottomNavigationAction component={Link} to={""} label="History" icon={<HistoryIcon className="icon"/>} />
          <BottomNavigationAction component={Link} to={"/user"} label="Profile" icon={<PersonIcon className="icon"/>} />
        </BottomNavigation>
        )
}

export default BottomNavbar;




