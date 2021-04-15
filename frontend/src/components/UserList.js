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
import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "material-ui-search-bar"; // https://www.npmjs.com/package/material-ui-search-bar
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import DeleteIcon from "@material-ui/icons/Delete";
import { useHistory } from "react-router";
import { backendURL } from "../globals";

function UserItem({ user, index, history, isFriend, setRefresh }) {
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
      // backgroundColor: theme.palette.primary.main,
      // color: theme.palette.primary.contrastText,

      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
    }
  }));
  const classes = useStyles();

  const imgPlaceholder = "https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";

  const [selected, setSelected] = useState(false);

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

    fetch(backendURL + "/create_friend", options)
      .then(response => response.json())
      .then(() => {
        setRefresh(true);
      });
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
          {/* <CardActionArea
            className={classes.fullHeight}
            onClick={() => {
              goToUserProfile(user.username);
            }}
          > */}
            <CardContent>
              <CardMedia
                className={classes.cover}
                image={imgPlaceholder /*process.env.PUBLIC_URL + user.img*/}
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h6" variant="h6">
                    {user.username}
                  </Typography>
                </CardContent>
              </div>
            </CardContent>
          {/* </CardActionArea> */}
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

  // new one. selecting doesnt work for some reason.
  // return (
  //   <Card className={`${classes.card} ${classes.tableItem}`} variant="outlined">
  //     <CardActionArea
  //       className={!selected ? classes.fullHeight : ""}
  //       onClick={() => {
  //         setSelected(!selected);
  //       }}
  //     >
  //       <CardContent>
  //         <CardMedia
  //           className={classes.cover}
  //           image={""}
  //         />
  //         <div className={classes.details}>
  //           <CardContent className={classes.content}>
  //             <Typography component="h5" variant="h5">
  //               {user.username}
  //             </Typography>
  //           </CardContent>
  //         </div>
  //       </CardContent>
  //     </CardActionArea>
  //     {selected ?
  //       <CardActions>
  //         <Button
  //           color="primary"
  //           variant="outlined"
  //           onClick={() => addFriend(user.username)}
  //           >
  //           Add Friend
  //         </Button>
  //         <Button
  //           color="primary"
  //           variant="outlined"
  //           onClick={() => goToUserProfile()}
  //           >
  //           Profile
  //         </Button>
  //         <Button
  //           color="primary"
  //           variant="outlined"
  //           onClick={() => goToMatch()}
  //         >
  //           Match 
  //         </Button>
  //       </CardActions>
  //       :
  //       ""
  //     }
  //   </Card>
  // );
}

function UserList(props) {
  const useStyles = makeStyles((theme) => ({
    root: {},
    cover: {
      width: "151",
    },
  }));
  const classes = useStyles();

  const ROWS_PER_PAGE = 5;

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

  // async function getFriendsAndUpdate(search) {
  //   let updatedList = [];
  //   let friendList = [];
    
  //   let userList = await getUsers(search);

  //   let thisUrl = url + "/select_userfriends?username=" + localStorage.getItem('username');
  //   //thisUrl = "http://ec2-35-183-39-123.ca-central-1.compute.amazonaws.com:3000/select_userfriends?username=lynn_varga";
  //   friendList = await fetch(thisUrl)
  //     .then(response => response.json())
  //     .catch(err => {
  //       console.log(err);
  //     });
    
  //   console.log("userList", userList);
  //   console.log("friendList", friendList);

  //   // userIndex returns the index, NOT the user object as I thought it would
  //   for (let userIndex in userList) {
  //     let currentUser = userList[userIndex];
  //     // console.log("currentUser", currentUser);
  //     for (let friendIndex in friendList) {
  //       let bool = userList[userIndex]._id === friendList[friendIndex].userId ? true : false;
  //       currentUser.isFriend = bool;
  //       console.log("bool stuff", bool);
  //     }
  //     updatedList.push(currentUser);
  //   }
  //   console.log(updatedList);
  //   return updatedList;
  // }

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
          {users.length > 0 ? 
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
          : 'hmm thats weird, there are no users'}
        </TableBody>
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
      </Table>
    </TableContainer>
  );
}

export default UserList;
