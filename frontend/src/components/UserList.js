/*
 *  UserList.js
 *  Renders the list of all users on the database.
 *  Allows users to lookup, send friend requests to, and match the selected user
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

import {
  Button,
  Card,
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
import SearchBar from "material-ui-search-bar"; // https://www.npmjs.com/package/material-ui-search-bar
import { useHistory } from "react-router";
import { backendURL } from "../globals";
import { sendAlert } from "../actions";
import { useDispatch } from "react-redux";

function UserItem({ user, history, setRefresh }) {
  const useStyles = makeStyles((theme) => ({
    root: {},
    fullHeight: {
      height: "80px",
    },
    tableItem: {
      maxHeight: "80px",
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
      color: "red",
      position: "absolute",
    },
    userIcon: {
      width: theme.spacing(7),
      height: theme.spacing(7),

      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
    }
  }));
  const classes = useStyles();

  const imgPlaceholder = "https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";

  const dispatch = useDispatch();

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
      setRefresh(true);
    }
    else {
      dispatch(sendAlert(response.statusText, ''));
    }
  }

  function goToUserProfile(username) {
    history.push({
      pathname: "/user",
      search: `?username=${username}`
    });
  }

  function goToMatch(username) {
    history.push({
      pathname: "/match",
      search: `?username=${username}`
    });
  }

  return (
    <Card className={`${classes.card} ${classes.tableItem}`} variant="outlined">
      <Grid container spacing={1} >
        <Grid item width={"70%"}>
          <CardContent>
            <CardMedia
              className={classes.cover}
              image={imgPlaceholder}
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h6" variant="h6">
                  {user.username}
                </Typography>
              </CardContent>
            </div>
          </CardContent>
        </Grid>
        <Grid item width={"30%"}>
          <CardActions>
            <Button
              color="primary"
              variant="contained"
              onClick={() => addFriend(user.username)}
            >
              Add
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => goToUserProfile(user.username)}
              >
              Profile
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => goToMatch(user.username)}
            >
              Match 
            </Button>
          </CardActions>
        </Grid>
      </Grid>
    </Card>
  );
}

function UserList() {
  const useStyles = makeStyles((theme) => ({
    root: {},
    cover: {
      width: "151",
    },
  }));
  const classes = useStyles();

  const ROWS_PER_PAGE = 10;

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [refresh, setRefresh] = useState(true);

  let history = useHistory();

  const url = backendURL;

  async function getUsers(search) {
    let userList = [];
    let thisUrl = url + (search ? "/search_users?username=" + search : "/select_users");
    
    userList = await fetch(thisUrl)
      .then(response => response.json())
      .catch(err => {
        console.log(err);
        setUsers([]);
      });
    
    return userList;
  }

  useEffect(() => {

    getUsers(search)
      .then(data => setUsers(data));

    return () => {
      setRefresh(false);
    }
  }, [search, refresh])

  const onChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow colSpan={2}>
            <SearchBar
              value={search}
              onChange={(newValue) => setSearch(newValue.trim())}
              />
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.length > 0 ? 
            users
              .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
              .map((user, index) => (
                <TableRow key={index} className={classes.tableItem}>
                  <UserItem 
                    user={user} 
                    index={index} 
                    history={history}
                    isFriend={user.isFriend}
                    setRefresh={setRefresh}/>
                </TableRow>
              ))
          : 'Your search did not return any results'}
        </TableBody>
        <TableFooter>
          <TableRow>
            <div style={{ width: "100%", margin: "auto" }}>
              <TablePagination
                rowsPerPageOptions={[ROWS_PER_PAGE]}
                count={users && users.length > 0 ? users.length : 0}
                page={page}
                rowsPerPage={ROWS_PER_PAGE}
                siblingcount={0}
                onChangePage={onChangePage}
              />
            </div>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default UserList;
