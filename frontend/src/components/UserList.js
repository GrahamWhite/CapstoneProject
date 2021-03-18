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

function UserItem({ user, index, history }) {
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
  }));
  const classes = useStyles();

  const imgPlaceholder = "https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";

  function goToUser(username) {
    localStorage.setItem("searchParams", user.username);
    history.push("/user");
  }

  function goToMatch(username) {
    localStorage.setItem("searchParams", user.username);
    history.push({
      pathname: "/match",
      search: `?username=${user.username}`
    });
  }

  return (
    <Card className={`${classes.card} ${classes.tableItem}`} variant="outlined">
      <Grid container spacing={1} >
        <Grid item width={"70%"}>
          <CardActionArea
            className={classes.fullHeight}
            onClick={() => {
              goToUser(user.username);
            }}
          >
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
          </CardActionArea>
        </Grid>
        <Grid item width={"30%"}>
          <CardActions>
            <Button
              color="primary"
              variant="outlined"
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
  // const [search, setSearch] = useState("");

  let history = useHistory();

  const url = backendURL;

  useEffect(() => {
    fetch(url + "/select_users")
      .then(response => response.json())
      .then(data => { setUsers(data); console.log(data);});
    console.log(users);
  }, [])

  const onChangePage = (event, newPage) => {
    setPage(newPage);
  };

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
          {users.length > 0 ? 
          users
            .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
            .map((user, index) => (
              <TableRow key={index} className={classes.tableItem}>
                <UserItem user={user} index={index} history={history} />
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
                siblingCount={0}
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
