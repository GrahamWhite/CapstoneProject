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
    button:{
      width: '25%',
      paddingTop: '1%',
      paddingBottom: '1%',
    },
    }));

function MainPage() {
    const classes = useStyles();
    const storedUsername = localStorage.getItem('username');
    return (
    <div>
        <h1 className={classes.center}>Welcome to Tink, {storedUsername}!</h1>
        <Typography variant="body1" className={classes.center} style={{color:"#666", marginTop:"2.5%"}}>With Tink you can keep track of your game library over all your platforms, find friends to play games with and see common games with friends!</Typography>
        {/* <SearchBar 
          // value={this.state.value}
          // onChange={(newValue) => this.setState({ value: newValue })}
          // onRequestSearch={() => doSomethingWith(this.state.value)}
          className={classes.center}/> */}
          <Button className={`${classes.center} ${classes.button}`} component={Link} to={"/Help"} variant="contained" color="secondary">Learn how to use Tink</Button>
          <Typography variant="body1" className={classes.center} style={{color:"#666", marginTop:"2.5%"}}>To see your library of games, friends, and edit your profile:</Typography>
          <Button className={`${classes.center} ${classes.button}`} component={Link} to={"/profile"} variant="contained" color="primary">See your profile</Button>
          <Typography variant="body1" className={classes.center} style={{color:"#666", marginTop:"2.5%"}}>To find a new friend, view a profile or match with a user:</Typography>
          <Button className={`${classes.center} ${classes.button}`} component={Link} to={"/search"} variant="contained" color="primary">Search for a user</Button>
          <Typography variant="body1" className={classes.center} style={{color:"#666", marginTop:"2.5%"}}>View your added users, match with your friends:</Typography>
          <Button className={`${classes.center} ${classes.button}`} component={Link} to={"/friend"} variant="contained" color="primary">See your friends list</Button>
          <Typography variant="body1" className={classes.center} style={{color:"#666", marginTop:"2.5%"}}>Add games to your library:</Typography>
          <Button className={`${classes.center} ${classes.button}`} component={Link} to={"/games"} variant="contained" color="secondary">Manage your library</Button>
    </div>
  )
}

export default MainPage

/* className={`${classes.half} ${classes.center}`} */

/* <Button component={Link} to={"/search"} color="inherit" className={classes.center}>Search</Button> */
