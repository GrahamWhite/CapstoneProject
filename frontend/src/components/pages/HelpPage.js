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
    },
    bodyMargin:{
        marginRight: '5%',
        marginLeft: '5%'
    },
    tab:{
        marginLeft: '3%'
    }  
    }));

function HelpPage() {
    const classes = useStyles();
    return (
    <div className={classes.bodyMargin}>
        <h1 className={classes.center}>Need Help using Tink?</h1>
        <Typography variant="h5">Introduction</Typography>
        <p>Tink is a web-based application with a focus on connecting friends and enthusiasts over games. 
            Our goal is to connect friends with each other over mutual games as there as of yet does not exist a platform to compare games across different platforms, game styles, and play styles. 
            We want to allow friends to compare game libraries over multiple platforms and choose mutual games to play together. </p>

        <Typography variant="h5">Getting Started</Typography>

        <Typography variant="h5">Features</Typography>
        <Typography variant="h6" className={classes.tab}>Register/Sign Up</Typography>
            <p className={classes.tab}>Select SIGN UP from the login screen, or select REGISTER in the top right corner 
                Enter a username - It must be not taken already
                Enter your email address
                Enter your password</p>
        <Typography variant="h6" className={classes.tab}>Login/Sign In</Typography>
        <p></p>
        <Typography variant="h6" className={classes.tab}>Profile</Typography>
        <Typography variant="h6" className={classes.tab}>Edit Your Profile</Typography>
        <Typography variant="h6" className={classes.tab}>Add a Game(s) to Your Library</Typography>
        <Typography variant="h6" className={classes.tab}>Remove a Game from Your Library</Typography>
        <Typography variant="h6" className={classes.tab}>Search for a User</Typography>
        <Typography variant="h6" className={classes.tab}>Add a Friend</Typography>
        <Typography variant="h6" className={classes.tab}>View a User's Profile</Typography>
        <Typography variant="h6" className={classes.tab}>Match with a User</Typography>
        <Typography variant="h6" className={classes.tab}>Match with a Friend</Typography>
        <Typography variant="h6" className={classes.tab}>Delete a Friend</Typography>
        <Typography variant="h6" className={classes.tab}>Logout</Typography>
        <Typography variant="h5">Conclusion</Typography>
        <Button
        color="primary"
        variant="contained"
        href="https://drive.google.com/file/d/1RhdFJcZF5CEPl2Evn2pQpTTboiw8GU6A/view?usp=sharing"
        >
        View our documentation
        </Button>
    </div>
  )
}

export default HelpPage

