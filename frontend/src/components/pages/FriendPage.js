import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography'
import BottomNavbar from '../BottomNavbar';
import AuthNavbar from '../AuthNavbar';
import FriendList from '../FriendList';

function FriendPage() {
  return (
    <div>
        <AuthNavbar/>
        <FriendList/>
        <BottomNavbar/>
    </div>
  )
}

export default FriendPage