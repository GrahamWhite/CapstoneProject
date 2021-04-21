/*
 *  SearchPage.js
 *  The page that renders on the /search route
 *  Accessed from the bottom navigation bar when logged in
 *  Shows the global list of users on the database for users to find and interact with.
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

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
