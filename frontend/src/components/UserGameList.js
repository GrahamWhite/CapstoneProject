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
  Typography
} from "@material-ui/core";
import { Link, useLocation } from 'react-router-dom'
import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "material-ui-search-bar"; // https://www.npmjs.com/package/material-ui-search-bar
import StarIcon from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";
import { backendURL } from "../globals";
import { useDispatch } from 'react-redux';
import { sendAlert } from "../actions";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';

function GameItem({game, index, onRemove, onFavourite, isProfile}) {
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

  const imgPlaceholder =
    "https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";

  // const updateHandler = dummyData => onUpdate({ ...props.game, ...props.dummyData});

  const [selected, setSelected] = useState(false);
  //const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    //setFavourite(game.favourite);
    setSelected(game.selected);
  }, [game.favourite])

  return (
    <Card className={`${classes.card} ${classes.tableItem}`} variant="outlined">
      <CardActionArea
        className={!selected ? classes.fullHeight : ""}
        onClick={() => {
          setSelected(!selected);
        }}
      >
        <CardContent>
          {/* {favourite 
          ? <StarIcon className={classes.favouriteIcon}/> 
          : ''} */}
          
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
          {/* <Button
            size="small"
            color="primary"
            variant="contained"
            startIcon={<StarIcon />}
            onClick={() => onFavourite(index)}
          >
            Favourite
          </Button> */}
          <Button
            size="small"
            color="secondary"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => onRemove(index)}
          >
            Remove
          </Button>
        </CardActions>
      ) : (
        null
      )}
    </Card>
  );
}

function UserGameList({username, isProfile}) {
  const useStyles = makeStyles((theme) => ({
    root: {},
    cover: {
      width: "151",
    },
  }));
  const classes = useStyles();

  const ROWS_PER_PAGE = 5;

  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [refresh, setRefresh] = useState(true);
  const [page, setPage] = useState(0);

  const dispatch = useDispatch();
  
  const url = backendURL;

  useEffect(() => {
    fetch(url + "/select_usergames?username=" + username)
      .then(response => response.json())
      .then(data => setGames(data));
    return () => {
      setRefresh(!refresh);
    }
  }, [username, refresh])

  const onChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // List changing functions
  // async function favouriteGame(index){
  //   let game = games[index];
  //   const response = await fetch(url + "/favourite_usergame")
  //     .then(response => response);
  //   if (response.ok) {
  //     const newGames = [...games];
  //     newGames[index].favourite = !newGames[index].favourite;
  //     setGames(newGames);
  //   }
  //   else {
  //     console.log(response.statusText);
  //   }
  // }

  async function removeGame(index) {
    const game = games[index];

    let alertMessage = "";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        username: localStorage.getItem('username'),
        game: game.name,
        platform: game.platform
      })
    }
    const response = await fetch(url + "/delete_usergame", options)
      .catch(err => {
        alertMessage = err;
      });

    if (response.ok) {
      const newGames = [...games];
      newGames.splice(index, 1);
      setGames(newGames);
      dispatch(sendAlert(game.name + " deleted from library", "success"));
      setRefresh(true);
    }
    else {
      console.log(response.statusText);
    }
  }

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
                  //onFavourite={favouriteGame}
                  onRemove={removeGame}
                  onSelected={onSelected}
                />
              </TableRow>
            ))
          : isProfile ?
            <Button 
            fullWidth 
            variant="contained" 
            color="primary"
            component={Link} 
            to={"/games"}>
              Add Games to your Library
            </Button>
            : null
          }
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

export default UserGameList;
