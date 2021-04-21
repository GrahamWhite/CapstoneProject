/*
 *  MatchHeader.js
 *  Displays information of both users relevant to the match query
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import { Grid, makeStyles, Typography } from '@material-ui/core';
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

function MatchHeader(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} spacing={3} justify="center" alignItems="center">
      {/* User 1 - Left user */}
      <Grid item xs={6}>
        <Grid container justify="center">
          <Grid item className={classes.profileImgContainer} xs={6}>
            <img className={classes.profileImg} src={props.user.avatarImg} alt="User image"/>
          </Grid>
          <Grid item className={classes.profileUsername} xs={6}>
            <Typography variant="h5" align="center">{props.user.username}</Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* User 2 - Right user */}
      <Grid item xs={6}>
        <Grid container justify="center">
          <Grid item className={classes.profileUsername} xs={6}>
            <Typography variant="h5" align="center">{props.matchedUser.username}</Typography>
          </Grid>
          <Grid item className={classes.profileImgContainer} xs={6}>
            <img className={classes.profileImg} src={props.matchedUser.avatarImg} alt="User image"/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MatchHeader;
