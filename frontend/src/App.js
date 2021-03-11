import {React, useState} from 'react'
//import './App.css';
import { darkTheme, lightTheme } from './components/PrimaryTheme.js';
import Navbar from './components/Navbar';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import HomePage from './components/pages/HomePage';
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage';
import UserProfile from './components/pages/UserProfile';
import { makeStyles, ThemeProvider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop:'5rem',
  }
}));

function App() {
  const [isDarkTheme, setTheme] = useState(true);
  const classes = useStyles();

  return (
    <Router className="App">
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
        <Navbar></Navbar>
        <div style={{marginTop:'5rem'}}>
          <Switch>
            <Route path='/' exact component={HomePage}/>
            <Route path='/login' exact component={LoginPage}/>
            <Route path='/register' exact component={RegisterPage}/>
            <Route path='/user' component={UserProfile}/>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
