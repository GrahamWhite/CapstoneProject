import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core'
import { useFetch, useInterval } from '../../util/CustomHooks';

function UserProfile() {
  const url = "http://ec2-35-183-39-123.ca-central-1.compute.amazonaws.com:3000";
  const username = localStorage.getItem('username');

  const {data, loading} = useFetch(`${url}/user?username=${username ? '0' : username}&authToken=${0}`);

  // const [seconds, setSeconds] = useState(0);
  // const [dots, setDots] = useState('');

  // setInterval(() => {
  //   setSeconds(seconds + 1);
  //   let string = '';
  //   for (let i = 0; i < seconds % 3; i++){
  //     string += '.';
  //   }
  //   setDots(string);
  // }, 1000);

  return (
    <div style={{padding:'10px'}}>
      {
        loading ?
        <Typography variant="h3" color="initial">loading{'...'}</Typography>
        : 
        <div>
          <Typography variant="h2" color="initial">Welcome {data.username}!</Typography>
          <Typography variant="h3" color="initial">Email: {data.email}</Typography>
        </div>
      }
    </div>
  )
}

export default UserProfile
