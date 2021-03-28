import {React, useState, useEffect} from 'react'
//import './App.css';
import { darkTheme, lightTheme } from './components/PrimaryTheme.js';
import Navbar from './components/Navbar';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import HomePage from './components/pages/HomePage';
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import SearchPage from './components/pages/SearchPage';
import NotificationPage from './components/pages/NotificationPage';
import FriendPage from './components/pages/FriendPage';
import MatchPage from './components/pages/MatchPage';
import ProfilePage from './components/pages/ProfilePage';
import GamesPage from './components/pages/GamesPage';
import { makeStyles, ThemeProvider } from '@material-ui/core';
import BottomNavbar from './components/BottomNavbar.js';
import AuthNavbar from './components/AuthNavbar.js';
import loggedInReducer from './reducers/loginReducer.js';
import { useSelector } from 'react-redux';
import UserPage from './components/pages/UserPage.js';
import SettingsPage from './components/pages/SettingsPage.js';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:'5rem',
  },
  bottomNavbarSpacer: {
    marginBottom: '60px'
  }
}));

function App() {

  const [isDarkTheme, setTheme] = useState(true);
  const classes = useStyles();

  //const isLogged = useSelector(state => state.isLogged);
  const isLogged = localStorage.getItem('username') ? true : false;

  return (
    <Router className="App">
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
       {isLogged 
       ? <AuthNavbar/> 
       : <Navbar/>}
        <div style={{marginTop:'5rem'}}>
          <Switch>
            <Route path='/' exact component={LoginPage}/>
            <Route path='/login' exact component={LoginPage}/>
            <Route path='/register' exact component={RegisterPage}/>

            <Route path='/main' exact component={MainPage}/>
            <Route path='/search' exact component={SearchPage}/>
            <Route path='/notification' exact component={NotificationPage}/>
            <Route path='/friend' exact component={FriendPage}/>
            <Route path='/match' exact component={MatchPage}/>
            <Route path='/profile' component={ProfilePage}/>
            <Route path='/user' component={UserPage}/>
            <Route path='/games' component={GamesPage}/>
            <Route path='/settings' component={SettingsPage}/>
          </Switch>
        </div>
        <div className={classes.bottomNavbarSpacer}></div>
        {isLogged 
        ? <BottomNavbar/> 
        : ''}
      </ThemeProvider>
    </Router>
  );
}

export default App;
