import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../RegisterForm';
import CloudLogo from '@material-ui/icons/Cloud'
import theme from '../PrimaryTheme';

function HomePage() {
  return (
    <div>
      <header className="App-header">
        <CloudLogo fontSize="large" className="App-logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <RegisterForm/>
      </header>
    </div>
  )
}

export default HomePage
