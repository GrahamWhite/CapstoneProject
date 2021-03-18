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

  const [username, setUsername] = useState(localStorage.getItem('username'));

  useEffect(() => {
    
  }, [])

  return (
    <Router className="App">
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
       {username 
       ? <AuthNavbar/> 
       : <Navbar/>}
        <div style={{marginTop:'5rem'}}>
          <Switch>
            <Route path='/' exact component={MainPage}/>
            <Route path='/login' exact component={LoginPage}/>
            <Route path='/register' exact component={RegisterPage}/>

            {/* <Route path='/main' exact component={MainPage}/> */}
            <Route path='/search' exact component={SearchPage}/>
            <Route path='/notification' exact component={NotificationPage}/>
            <Route path='/friend' exact component={FriendPage}/>
            <Route path='/match' exact component={MatchPage}/>
            <Route path='/user' component={ProfilePage}/>

            <Route path='/games' component={GamesPage}/>
          </Switch>
        </div>
        <div className={classes.bottomNavbarSpacer}></div>
        {username 
        ? <BottomNavbar/> 
        : ''}
      </ThemeProvider>
    </Router>
  );
}

export default App;
