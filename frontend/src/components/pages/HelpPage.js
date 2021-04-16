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
    },
    button:{
        width: '25%',
        paddingTop: '1%',
        paddingBottom: '1%',
      },
    }));

function HelpPage() {
    const classes = useStyles();
    return (
    <div className={classes.bodyMargin}>
        <h1 className={classes.center}>Need Help using Tink?</h1>
        <Typography variant="h5" className={classes.center}>Introduction</Typography>
        <p>Tink is a web-based application with a focus on connecting friends and enthusiasts over games. 
            Our goal is to connect friends with each other over mutual games as there as of yet does not exist a platform to compare games across different platforms, game styles, and play styles. 
            We want to allow friends to compare game libraries over multiple platforms and choose mutual games to play together. </p>

        <Typography variant="h5" className={classes.center}>Getting Started</Typography>
        <p>System Requirements:
            Access to the internet
            Access to an updated browser, Chrome or Edge

            You will have to sign up for an account in order to access Tink.
            </p>
        <Typography variant="h5" className={classes.center}>Features</Typography>
        <hr></hr>
        <Typography variant="h6" className={classes.tab}>Register/Sign Up</Typography>
            <p className={classes.tab}>Select SIGN UP from the login screen, or select REGISTER in the top right corner 
            &#62; Enter a username - It must be not taken already
            &#62; Enter your email address
            &#62; Enter your password</p>
        <hr></hr>
        <Typography variant="h6" className={classes.tab}>Login/Sign In</Typography>
            <p>Enter your username 
            &#62; Enter your password
            &#62; Select login
            </p>
            <hr></hr>
        <Typography variant="h6" className={classes.tab}>Profile</Typography>
            <p>Your profile features your username, bio. The list of games in your library, and your friends list. </p>
            <hr></hr>
        <Typography variant="h6" className={classes.tab}>Edit Your Profile</Typography>
            <p>From the profile select the settings gear icon in the top right corner
            &#62; Change or Add a bio and/or
            &#62; Change your email
            &#62; Select Save changes
            </p>
            <hr></hr>
        <Typography variant="h6" className={classes.tab}>Add a Game(s) to Your Library</Typography>
            <p>
            Select Manage Your Library on the main page or select the profile button on the bottom nav bar.
            &#62; Use the search bar to enter the desired game
            &#62; Select the desired game
            &#62; Select add to list
            </p>
            <hr></hr>
        <Typography variant="h6" className={classes.tab}>Remove a Game from Your Library</Typography>
            <p>
            Select manage your library on the home page
            &#62; Search and select the desired game using the search bar
            &#62; Select Remove 
            </p>
            <p>OR</p>
            <p>
            Select See Your Friends List
            &#62; Select the friend you wish to delete
            &#62; Select Delete Friend
            </p>
            <hr></hr>
        <Typography variant="h6" className={classes.tab}>Search for a User</Typography>
            <p>
            Click on the Search button in the bottom navigation bar 
            &#62; Click on the search bar and type in the username of the desired user.
            </p>
            <hr></hr>
        <Typography variant="h6" className={classes.tab}>Add a Friend</Typography>
            <p>
            Click on the Search button in the bottom navigation bar 
            &#62; Click on the search bar and type the username of the desired user.  
            &#62; Click the Add button to add the friend to your profile.
            </p>
            <hr></hr>
        <Typography variant="h6" className={classes.tab}>View a User's Profile</Typography>
            <p>
            Select Search For a User 
            &#62; Using the search bar, search for the desired username
            &#62; Select the desired friend
            &#62; Select Profile
            </p>
            <hr></hr>
        <Typography variant="h6" className={classes.tab}>Match with a User</Typography>
            <p>
            Click either the Search for User button or the Add friend button
            &#62; Search for the user using the search bar at the top of the page
            &#62; Click the Match button to display a list of similar games
            </p>
            <hr></hr>
        <Typography variant="h6" className={classes.tab}>Match with a Friend</Typography>
            <p>
            Select the friends tab
            &#62; Select the friend you wish to match with
            &#62; Select match
            </p>
            <hr></hr>
        <Typography variant="h6" className={classes.tab}>Delete a Friend</Typography>
            <p>
            Select See Your Friends List 
            &#62; Select the desired friend
            &#62; Select Delete Friend
            </p>
            <p>OR</p>
            <p>Select See Your Profile or the profile button 
            &#62; Select the desired friend
            &#62; Select Delete Friend
            </p>
            <hr></hr>
        <Typography variant="h6" className={classes.tab}>Logout</Typography>
            <p>Click the logout button in the top right corner</p>
            <hr></hr>
        <Typography variant="h5" className={classes.center}>Conclusion</Typography>
        <p>
            Tink’s user interface is still in development.  For any question or concerns please feel free to reach out to our developers.
        </p>

        <Typography variant="h6" className={classes.tab}>Triad Development Contact Information: </Typography>
        <p>
            Project Manager & Full Stack Developer:<br></br> 
            Conestoga Email: <a href="mailto:lvarga7397@conestogac.on.ca">lvarga7397@conestogac.on.ca</a><br></br> 
            Email: <a href="mailto:lynnkvarga@gmail.com">lynnkvarga@gmail.com</a> 
        </p>
        <p>
            Frontend Developer: <br></br>
            
            Conestoga Email: <a href="mailto:tmills9208@conestogac.on.ca">tmills9208@conestogac.on.ca</a><br></br>
            Email: <a href="mailto:tmills9208@gmail.com"> tmills9208@gmail.com</a>
        <p>
            Backend Developer: <br></br>
            Conestoga Email: <a href="mailto:gwhite9740@conestogac.on.ca">gwhite9740@conestogac.on.ca</a><br></br>
            Email: <a href="mailto:grahamwhite365@gmail.com">grahamwhite365@gmail.com</a>
        </p>
        
        </p>
        <Button
        color="primary"
        variant="contained"
        className={`${classes.center} ${classes.button}`}
        href="https://drive.google.com/file/d/1RhdFJcZF5CEPl2Evn2pQpTTboiw8GU6A/view?usp=sharing"
        >
        View our documentation
        </Button>
        <br></br>
    </div>
  )
}

export default HelpPage

