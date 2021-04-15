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
import { backendURL } from "../globals";

function GameItem({game, index}) {
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
    gameIcon: {
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

  return (
    <Card className={`${classes.card} ${classes.tableItem}`} variant="outlined">
      <CardActionArea className={classes.fullHeight}>
        <CardContent>
          {game.favourite 
          ? <StarIcon className={classes.favouriteIcon}/> 
          : ''}
          
          <CardMedia
            className={classes.cover}
            image={imgPlaceholder /*process.env.PUBLIC_URL + game.img*/}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
            <Grid container item spacing={3}>
                <Grid item xs={12} sm={1}>
                  <Avatar className={classes.gameIcon}>{game.name.substr(0,2)}</Avatar>
                </Grid>
                <Grid item xs={12} sm={10}>
                <Typography component="h5" variant="h5">
                {game.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {game.platform}
                </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

function MatchList(props) {
  const useStyles = makeStyles((theme) => ({
    root: {},
  }));
  const classes = useStyles();

  const ROWS_PER_PAGE = 5;

  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [page, setPage] = useState(0);

  const [user, setUser] = useState(localStorage.getItem('username'));
  const [matchedUser, setMatchedUser] = useState(new URLSearchParams(window.location.search).get('username'));
  
  const url = backendURL;
  

  const oldURL = `${url}/user_game_match?username=${user}&matchedUsername=${matchedUser}`;
  useEffect(() => {
    setUser(localStorage.getItem('username'));
    setMatchedUser(new URLSearchParams(window.location.search).get('username'));
    fetch(oldURL)
      .then(response => response.json())
      .then(data => setGames(data))
      .catch(err => {
        console.log(err);
        setGames([]);
      });
  }, [])

  const onChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // List changing functions
  // Idea to display additional info for matched games on click
  const onSelected = (index, selected) => {
    const newGames = [...games];
    for (let game of newGames) game.selected = false;
    newGames[index].selected = selected;
    setGames(newGames);
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow colSpan={2}>
          <Typography variant="h5" align="center" className={classes.center}>You have {games.length} games in common!</Typography>
          {/* <Typography variant="h5" align="center" className={classes.center}>You both play on these platforms: {games.platform}</Typography>*/}
            {/* <SearchBar
                value={search}
              /> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {games.length > 0 ? 
            games
            .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
            .map((game, index) => (
              <TableRow key={index} className={classes.tableItem}>
                <GameItem 
                  game={game}
                  index={index}
                  //Add platform into array
                />
              </TableRow>
            ))
          : 'Uh oh, no games loaded'}
        </TableBody>
        <TableFooter>
          <TableRow>
            <div style={{ width: "100%", margin: "auto" }}>
              { games.length > 0 ? 
              <TablePagination
                rowsPerPageOptions={[5]}
                count={games.length}
                page={page}
                rowsPerPage={ROWS_PER_PAGE}
                siblingcount={0}
                onChangePage={onChangePage}
              />
              : null}
            </div>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default MatchList;
