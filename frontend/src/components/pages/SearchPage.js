import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import BottomNavbar from '../BottomNavbar';
import AuthNavbar from '../AuthNavbar';
import SearchBar from "material-ui-search-bar";

function SearchPage() {
  return (
    <div>
        <SearchBar/>
    </div>
  )
}

export default SearchPage
