import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import BottomNavbar from '../BottomNavbar';
import AuthNavbar from '../AuthNavbar';
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles((theme) => ({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '75%',
        margin: 'auto',
        marginBottom: '2%'
    }
    }));

function MainPage() {
    const classes = useStyles();
    const storedUsername = localStorage.getItem('username');
    return (
    <div>
        <h1 className={classes.center}>Welcome to Tink, {storedUsername}!</h1>
        {/* <SearchBar 
          // value={this.state.value}
          // onChange={(newValue) => this.setState({ value: newValue })}
          // onRequestSearch={() => doSomethingWith(this.state.value)}
          className={classes.center}/> */}
          <Button className={classes.center} component={Link} to={"/search"} variant="contained" color="primary">Search for a user</Button>
          <Button className={classes.center} component={Link} to={"/games"} variant="contained" color="primary">Manage your library</Button>
    </div>
  )
}

export default MainPage

/* className={`${classes.half} ${classes.center}`} */

/* <Button component={Link} to={"/search"} color="inherit" className={classes.center}>Search</Button> */
