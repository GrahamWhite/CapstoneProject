/*
 *  App.js
 *  The main application loaded by src/index.js
 *  Handles routing to the different pages with the use of react-router
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import React from 'react'
import { lightTheme } from './components/PrimaryTheme.js';
import Navbar from './components/Navbar';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import SearchPage from './components/pages/SearchPage';
import FriendPage from './components/pages/FriendPage';
import MatchPage from './components/pages/MatchPage';
import ProfilePage from './components/pages/ProfilePage';
import GamesPage from './components/pages/GamesPage';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import BottomNavbar from './components/BottomNavbar.js';
import AuthNavbar from './components/AuthNavbar.js';
import { connect } from 'react-redux';
import UserPage from './components/pages/UserPage.js';
import SettingsPage from './components/pages/SettingsPage.js';
import HelpPage from './components/pages/HelpPage.js';
import { AlertSnackbar } from './components/AlertSnackbar.js';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:'5rem',
  },
  bottomNavbarSpacer: {
    marginBottom: '60px'
  }
}));

function App(props) {
  const classes = useStyles();

  return (
    <Router className="App">
      <ThemeProvider theme={lightTheme}>
       {props.loggedIn ? <AuthNavbar/> : <Navbar/>}
        <div style={{marginTop:'5rem'}}>
          <Switch>
            <Route path='/' exact>
              {props.loggedIn ? <Redirect to="/main"/> : <Redirect to="/login"/>}
            </Route>
            <Route path='/login' exact component={LoginPage}/>
            <Route path='/register' exact component={RegisterPage}/>
            <Route path='/main' exact component={MainPage}/>
            <Route path='/search' exact component={SearchPage}/>
            <Route path='/friend' exact component={FriendPage}/>
            <Route path='/match' exact component={MatchPage}/>
            <Route path='/profile' component={ProfilePage}/>
            <Route path='/user' component={UserPage}/>
            <Route path='/games' component={GamesPage}/>
            <Route path='/settings' component={SettingsPage}/>

            <Route path='/help' component={HelpPage}/>
          </Switch>
        </div>
        {/* Alert Snackbar */}
        <AlertSnackbar></AlertSnackbar>
        <div className={classes.bottomNavbarSpacer}></div>
        {props.loggedIn ? <BottomNavbar/> : null}
      </ThemeProvider>
    </Router>
  );
}

const mapState = (state) => {
  return {
    loggedIn: state.loggedIn
  }
}

const connectedApp = connect(mapState, null)(App);
export { connectedApp as App };
