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

  const imgPlaceholder =
    "https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";

  // const updateHandler = dummyData => onUpdate({ ...props.user, ...props.dummyData});

  const [selected, setSelected] = useState(false);
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    setFavourite(user.favourite);
    setSelected(user.selected);
  }, [user.favourite]);

  function goToUser(username) {
    localStorage.setItem("searchParams", user.username);
    history.push("/user");
  }

  function goToMatch(username) {
    localStorage.setItem("searchParams", user.username);
    history.push("/match");
  }

  return (
    <Card className={`${classes.card} ${classes.tableItem}`} variant="outlined">
      <Grid container spacing={1} >
        <Grid item width={"70%"}>
          <CardActionArea
            className={!selected ? classes.fullHeight : ""}
            onClick={() => {
              goToUser(user.username);
            }}
          >
            <CardContent>
              {favourite ? <StarIcon className={classes.favouriteIcon} /> : ""}

              <CardMedia
                className={classes.cover}
                image={imgPlaceholder /*process.env.PUBLIC_URL + user.img*/}
              />
              <div className={classes.details}>
                <CardContent className={classes.content}>
                  <Typography component="h6" variant="h6">
                    {user.name}
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

  const dummyData = [
    {
      id: "0",
      name: "Tyler Mills",
    },
    {
      id: "1",
      name: "Lynn Varga",
    },
    {
      id: "2",
      name: "Graham White",
    },
    {
      id: "3",
      name: "Tyler Mills",
    },
    {
      id: "4",
      name: "Tyler Mills",
    },
    {
      id: "5",
      name: "Tyler Mills",
    },
    {
      id: "6",
      name: "Tyler Mills",
    },
    {
      id: "7",
      name: "Tyler Mills",
    },
    {
      id: "8",
      name: "Tyler Mills",
    },
    {
      id: "9",
      name: "Tyler Mills",
    },
  ];

  const ROWS_PER_PAGE = 5;

  const [users, setUsers] = useState(dummyData);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  let history = useHistory();

  const url =
    "http://ec2-35-183-39-123.ca-central-1.compute.amazonaws.com:3000";

  //Events
  async function getData() {
    let username = localStorage.getItem("username");
    if (!username) return;

    let isValid = false;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(username),
    };

    let responseData = "";
    try {
      console.log(username);
      let response = await fetch(url + "/users", options);
      console.log(response);
      responseData = await response.json();
      isValid = true;
    } catch (err) {
      console.log(responseData);
      console.log(err);
    }

    if (isValid) {
      console.log("coooool");
    }
  }

  const onChange = useCallback((updatedUser) => {
    const userIndex = users.findIndex((emp) => emp.id === updatedUser.id);
    users[userIndex] = updatedUser;
    setUsers([...users]);
  }, []);

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
          {users
            .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
            .map((user, index) => (
              <TableRow key={index} className={classes.tableItem}>
                <UserItem user={user} index={index} history={history} />
              </TableRow>
            ))}
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
