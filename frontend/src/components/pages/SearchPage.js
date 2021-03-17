import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import BottomNavbar from '../BottomNavbar';
import AuthNavbar from '../AuthNavbar';
import SearchBar from "material-ui-search-bar";
import UserList from '../UserList';

function SearchPage() {
  return (
    <div>
        <SearchBar/>
        <UserList/>
    </div>
  )
}

export default SearchPage
