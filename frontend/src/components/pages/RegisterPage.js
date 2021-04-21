/*
 *  RegisterPage.js
 *  The page that renders on the /register route
 *  allows users who havent logged on to register via the register form provided on the page
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import React from 'react'
import RegisterForm from '../RegisterForm';

function RegisterPage() {
  return (
    <div>
      <RegisterForm/>
    </div>
  )
}

export default RegisterPage
