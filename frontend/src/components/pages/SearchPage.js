import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button,  makeStyles } from '@material-ui/core';
import BottomNavbar from '../BottomNavbar';
import AuthNavbar from '../AuthNavbar';
import SearchBar from "material-ui-search-bar";
import UserList from '../UserList';

const useStyles = makeStyles((theme) => ({
  center: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '75%',
      margin: 'auto',
  }
  }));

function SearchPage() {
  const classes = useStyles();

  return (
    <div>
      <h1 className={classes.center}>Search Users</h1>
        <UserList/>
    </div>
  )
}

export default SearchPage
