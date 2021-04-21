/*
 *  FriendsList.js
 *  Lists the friends of a user, determined by the username passed into the props
 *  Also renders the add and remove buttons depending on whether the user is on their own profile page.
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import { useHistory } from "react-router";
import { backendURL } from "../globals";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { sendAlert } from "../actions";
import { useDispatch } from "react-redux";

function UserItem({ user, history, setRefresh, isProfile, removeFriend }) {
  const useStyles = makeStyles((theme) => ({
    root: {},
    fullHeight: {
      height: "178px",
    },
    tableItem: {
      minHeight: "178px",
    },
    cover: {
      width: "151",
    },
    blankItem: {},
    favouriteIcon: {
      width: "30px",
      height: "auto",
      top: "5%",
      left: "100%",
      transform: "translate(-40px)",
      color: 'red',
      position: 'absolute',
    },
    friendIcon: {
      width: theme.spacing(7),
      height: theme.spacing(7),

      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
    }
  }));
  const classes = useStyles();

  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();

  function goToUserProfile() {
    history.push({
      pathname: "/user",
      search: `?username=${user.username}`
    });
  }

  function goToMatch() {
    history.push({
      pathname: "/match",
      search: `?username=${user.username}`
    });
  }

  async function addFriend(){
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        username: localStorage.getItem('username'),
        friendUsername: user.username
      })
    }

    const response = await fetch(backendURL + "/create_friend", options)

    if (response.ok) {
      dispatch(sendAlert(user.username + ' added to your friends list!', 'success'));
      setRefresh();
    }
    else {
      dispatch(sendAlert(response.statusText, ''));
    }
  }

  async function removeFriend(){
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        username: localStorage.getItem('username'),
        friendUsername: user.username
      })
    }

    const response = await fetch(backendURL + "/delete_friend", options);

    if (response.ok) {
      dispatch(sendAlert(user.username + ' successfully removed from your friends list', "success"));
      setRefresh();
    }
    else {
      dispatch(sendAlert(response.statusText, ''));
    }
  }

  return (
    <Card className={`${classes.card} ${classes.tableItem}`} variant="outlined">
      <CardActionArea
        className={!selected ? classes.fullHeight : ""}
        onClick={() => {
          setSelected(!selected);
        }}
      >
        <CardContent>
          <CardMedia
            className={classes.cover}
            image={""}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
            <Grid container item spacing={3}>
                <Grid item xs={12} sm={1}>
                  <Avatar className={classes.friendIcon}>{user.username.substr(0,2)}</Avatar>
                </Grid>
                <Grid item xs={12} sm={10}>
                  <Typography component="h5" variant="h5">
                  {user.username}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={1}>
                {selected ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
                </Grid>
              </Grid>
            </CardContent>
          </div>
        </CardContent>
      </CardActionArea>
      {selected ? (
        <CardActions>
          { !isProfile ? 
              <Button
                color="primary"
                variant="contained"
                onClick={() => addFriend(user.username)}
                >
                Add Friend
              </Button>
            : null }
          <Button
            color="primary"
            variant="contained"
            onClick={() => goToUserProfile()}
            >
            Profile
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={() => goToMatch()}
          >
            Match 
          </Button>
          { isProfile ? 
            <Button
              color="primary"
              variant="contained"
              onClick={() => removeFriend(user.username)}
            >
              Delete friend
            </Button>
          : null }
        </CardActions>
      ) : (
        ""
      )}
    </Card>
  );
}

function FriendsList({username, isProfile}) {
  const useStyles = makeStyles((theme) => ({
    root: {},
    cover: {
      width: "151",
    },
  }));
  const classes = useStyles();

  const ROWS_PER_PAGE = 5;

  const [users, setUsers] = useState([]);
  const [currentUser] = useState(new URLSearchParams(window.location.search).get('username'));
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(true);

  const history = useHistory();
  const location = useLocation();

  const url = backendURL;

  useEffect(() => {

    if (!isProfile) {
      let userList = [];
      let friendList = [];

      fetch(url + "/select_userfriends?username=" + currentUser)
        .then(response => response.json())
        .then(data => { 
          setUsers(data); 
        });

      fetch(url + "/select_userfriends?username=" + localStorage.getItem('username'))
        .then(response => response.json())
        .then(data => { 
          friendList = data; 
        });
      
      for (let user in userList) {
        for (let friend in friendList) {
          user.isFriend = user.username === friend.username ? true : false;
        }
      }
      setUsers(userList);
    }
    else {
      let userList = [];

      fetch(url + "/select_userfriends?username=" + localStorage.getItem('username'))
        .then(response => response.json())
        .then(data => { setUsers(data); });

      for (let user in userList) {
        user.isFriend = true;
      }

      setUsers(userList);
    }
    
    return () => {
      setRefresh(!refresh);
    }
  }, [username, refresh])

  const toggleRefresh = () => {
    setRefresh(!refresh);
  }

  const onChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          { users.length > 0 ? 
              users
              .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
              .map((user, index) => (
              <TableRow key={index} className={classes.tableItem}>
                <UserItem 
                  user={user} 
                  index={index} 
                  history={history}
                  location={location}
                  setRefresh={toggleRefresh}
                  isProfile={isProfile}
                  isFriend={user.isFriend}/>
              </TableRow>
            ))
            : isProfile ?
            <div style={{ width: "100%", margin: "auto" }}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                component={Link}
                to={"/search"}>
                Find friends
              </Button>
            </div> 
            : null
          }
        </TableBody>
        { users.length > 0 ? 
        <TableFooter>
          <TableRow>
            <div style={{ width: "100%", margin: "auto" }}>
              <TablePagination
                rowsPerPageOptions={[ROWS_PER_PAGE]}
                count={users.length}
                page={page}
                rowsPerPage={ROWS_PER_PAGE}
                siblingcount={0}
                onChangePage={onChangePage}
              />
            </div>
          </TableRow>
        </TableFooter>
        : null }
      </Table>
    </TableContainer>
  );
}

export default FriendsList;
