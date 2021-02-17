import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'

function LoginPage() {
  return (
    <div>
      <Typography variant="h1" color="initial">Login here!</Typography>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
    </div>
  )
}

export default LoginPage
