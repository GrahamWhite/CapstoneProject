import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  containerProfile1: {
    display: 'inherit',
    flex: '1 4 200px',
    justifyContent: 'center'
  },
  containerProfile2: {
    padding: '10px'
  },
}));

function ProfileHeader(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.containerProfile1}>
        <div>
          <img src={props.user.avatarImg} alt="User image"/>
        </div>
        <div className={classes.topInfo}>
          <Typography variant="h6" color="initial">{props.user.username}!</Typography>
        </div>
      </div>
      <div className={classes.containerProfile2}>

      </div>
    </div>
  )
}

export default ProfileHeader;
