/*
 *  UserHeader.js
 *  Displays the username, profile picture and bio of the user.
 *  Takes in a user prop to load the data
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import { Grid, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '10px'
  },
  profileImgContainer: {
    minWidth: '100px',
    minHeight: '100px',
    maxWidth: '200px',
    maxHeight: '200px',
    background: '#aaaaaa'
  },
  profileImg: {
    width: '100%',
    height: '100%'
  }
}));

function UserHeader({user}) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const imgPlaceholder = 'https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg';

  return (
    <Grid container className={classes.root} spacing={3} justify="center" alignItems="center">
      <Grid container item spacing={2} justify="center">
        <Grid item className={classes.profileImgContainer} xs={12} sm={3}>
          <img className={classes.profileImg} src={user.avatarImg || imgPlaceholder} alt="User image"/>
        </Grid>
        <Grid item className={classes.profileUsername} xs={12} sm={9}>
          <Typography variant="h5" align={matches ? 'left' : 'center'}>{user.username}</Typography>
          <Typography variant="body1" align={matches ? 'left' : 'center'} style={{color:"#666", marginTop:"2.5%"}}>{user.bio ? `Bio: ${user.bio}` : `${user.username} doesn't have a bio`}</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default UserHeader;
