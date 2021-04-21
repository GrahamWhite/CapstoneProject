/*
 *  LoginPage.js
 *  The page that renders on the /login route
 *  allows users who havent logged on to login via the login form provided on the page
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import React from 'react';
import LoginForm from '../LoginForm';

function LoginPage() {
  return (
    <div>
      <LoginForm/>
    </div>
  )
}

export default LoginPage
