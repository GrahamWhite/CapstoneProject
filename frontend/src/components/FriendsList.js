import {
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
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom'
import SearchBar from "material-ui-search-bar"; // https://www.npmjs.com/package/material-ui-search-bar
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router";
import { backendURL } from "../globals";

function UserItem({ user, index, history, location, setRefresh, isProfile, isFriend, removeFriend }) {
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
    }
  }));
  const classes = useStyles();

  const [selected, setSelected] = useState(false);

  function goToUserProfile() {
    history.push({
      pathname: "/user",
      search: `?username=${user.username}`
    });
    history.go(0);
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
      .then(response => response.json())
      .then(() => {
        setRefresh(true);
      });
    
    if (!response.ok) {
      console.log(response.statusText);
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

    fetch(backendURL + "/delete_friend", options)
      .then(response => response.json())
      .then(() => {
        setRefresh(true);
        history.go(0);
      });
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
              <Typography component="h5" variant="h5">
                {user.username}
              </Typography>
            </CardContent>
          </div>
        </CardContent>
      </CardActionArea>
      {selected ? (
        <CardActions>
          { !isProfile ? 
              <Button
                color="primary"
                variant="outlined"
                onClick={() => addFriend(user.username)}
                >
                Add Friend
              </Button>
            : null }
          <Button
            color="primary"
            variant="outlined"
            onClick={() => goToUserProfile()}
            >
            Profile
          </Button>
          <Button
            color="primary"
            variant="outlined"
            onClick={() => goToMatch()}
          >
            Match 
          </Button>
          { isProfile ? 
            <Button
              color="primary"
              variant="outlined"
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
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser] = useState(new URLSearchParams(window.location.search).get('username'));
  const [page, setPage] = useState(0);
  const [refresh, setRefresh] = useState(true);
  // const [search, setSearch] = useState("");

  const history = useHistory();
  const location = useLocation();

  const url = backendURL;

  useEffect(() => {

    if (!isProfile) {
      let userList = [];
      let friendList = [];

      fetch(url + "/select_userfriends?username=" + currentUser)
        .then(response => response.json())
        .then(data => { setUsers(data); console.log(data); });

      fetch(url + "/select_userfriends?username=" + localStorage.getItem('username'))
        .then(response => response.json())
        .then(data => { friendList = data; console.log(data); });
      
      for (let user in userList) {
        for (let friend in friendList) {
          user.isFriend = user.username === friend.username ? true : false;
        }
      }
      setUsers(userList);
      console.log('loaded users', userList);
    }
    else {
      let userList = [];

      fetch(url + "/select_userfriends?username=" + localStorage.getItem('username'))
        .then(response => response.json())
        .then(data => { setUsers(data); console.log(data); });

      for (let user in userList) {
        user.isFriend = true;
      }

      setUsers(userList);
      console.log('loaded users', userList);
    }

    
    console.log('new users', users);
    
    return () => {
      setRefresh(!refresh);
    }
  }, [username, refresh])

  const onChangePage = (event, newPage) => {
    setPage(newPage);
  };

  async function removeFriend(friendUsername) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        username: localStorage.getItem('username'),
        friendUsername: friendUsername
      })
    }
    const response = await fetch(url + "/delete_friend", options);

    if (response.ok) {
      setRefresh(true);
    }
    else {
      console.log(response.statusText);
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow colSpan={2}>
            {/* <SearchBar
                value={search}
              /> */}
          </TableRow>
        </TableHead>
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
                  setRefresh={setRefresh}
                  isProfile={isProfile}
                  isFriend={user.isFriend}
                  removeFriend={removeFriend}/>
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
