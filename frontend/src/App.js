import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import HomePage from './components/pages/HomePage';
import RegisterPage from './components/pages/RegisterPage'
import LoginPage from './components/pages/LoginPage';
import UserProfile from './components/pages/UserProfile';

function App() {
  return (
    <Router className="App">
      <Navbar></Navbar>
      <Switch>
        <Route path='/' exact component={HomePage}/>
        <Route path='/login' component={LoginPage}/>
        <Route path='/register' component={RegisterPage}/>
        <Route path='/user' component={UserProfile}/>
      </Switch>
    </Router>
  );
}

export default App;
