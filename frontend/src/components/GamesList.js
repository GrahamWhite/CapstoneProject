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
import AddIcon from "@material-ui/icons/Add";
import StarIcon from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";
import { backendURL, ReAuthenticate } from "../globals";

function GameItem({game, index, url, onSelected, onFavourite}) {
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

  const imgPlaceholder =
    "https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";

  // const updateHandler = dummyData => onUpdate({ ...props.game, ...props.dummyData});

  const [selected, setSelected] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [disableAddButton, setDisableAddButton] = useState(false)

  useEffect(() => {
    setFavourite(game.favourite);
    setSelected(game.selected);
  }, [game.favourite])

  // function addSelected(index) {

  // }

  const addToUserGames = index => {
    const values = {
      username: localStorage.getItem('username'),
      name: game.name
    }

    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify(values)
    }
    fetch(url + "/create_usergame", options)
      .then(response => response.json())
      .then(data => {
        setDisableAddButton(true);
      })
      .catch((err) => {
        if (!localStorage.getItem('username')){
          ReAuthenticate();
        }
        console.log(err);
      });
  }

  // const onSelected = (index, selected) => {
  //   const newGames = [...games];
  //   for (let game of newGames) game.selected = false;
  //   newGames[index].selected = selected;
  //   setGames(newGames);
  // }

  return (
    <Card className={`${classes.card} ${classes.tableItem}`} variant="outlined">
      <CardActionArea
        className={!selected ? classes.fullHeight : ""}
        onClick={() => {
          setSelected(!selected);
        }}
      >
        <CardContent>
          {favourite 
          ? <StarIcon className={classes.favouriteIcon}/> 
          : ''}
          
          <CardMedia
            className={classes.cover}
            image={imgPlaceholder /*process.env.PUBLIC_URL + game.img*/}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {game.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {game.platform}
              </Typography>
            </CardContent>
          </div>
        </CardContent>
      </CardActionArea>
      {selected ? (
        <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          disabled={disableAddButton}
          startIcon={<AddIcon />}
          onClick={() => addToUserGames(index)}
        >
          Add to List
        </Button>
          <Button
            size="small"
            color="primary"
            variant="contained"
            startIcon={<StarIcon />}
            onClick={() => onFavourite(index)}
          >
            Favourite
          </Button>
        </CardActions>
      ) : (
        ""
      )}
    </Card>
  );
}

function GamesList(props) {
  const useStyles = makeStyles((theme) => ({
    root: {},
    cover: {
      width: "151",
    },
  }));
  const classes = useStyles();

  const ROWS_PER_PAGE = 5;

  const [games, setGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);
  // const [allGamesButton, setAllGamesButton] = useState(false);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const url = backendURL;

  useEffect(() => {
    if (!search) {
      fetch(url + "/select_games")
        .then(response => response.json())
        .then(data => { setGames(data); console.log(data);});
      console.log(games);
    }
    else {
      fetch(url + "/search_games?name=" + search)
        .then(response => response.json())
        .then(data => { setGames(data); console.log(data);});
      console.log(games);
    }
    
  }, [search])

  // useEffect(() => {
  //   if (selectedGames.length > 0) {
  //     setAllGamesButton(true);
  //   }
  //   else {
  //     setAllGamesButton(false);
  //   }
  // }, [selectedGames]);

  // List changing functions

  const onChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const favouriteGame = index => {
    const newGames = [...games];
    let favourited = newGames[index].favourite;
    newGames[index].favourite = !favourited;
    setGames(newGames);
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
            <SearchBar
              value={search}
              onChange={(newValue) => setSearch(newValue.trim())}
              />
          </TableRow>
        </TableHead>
        <TableBody>
          {games.length > 0 ? 
            games
            // .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
            .map((game, index) => (
              <TableRow key={index} className={classes.tableItem}>
                <GameItem 
                  game={game}
                  index={index}
                  url={url}
                  onSelected={onSelected}
                  onFavourite={favouriteGame}
                />
              </TableRow>
            ))
          : 'Uh oh, no games loaded'}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <div style={{ width: "100%", margin: "auto" }}>
              { games.length > 0 ? 
              <TablePagination
                rowsPerPageOptions={[5]}
                count={games.length}
                page={page}
                rowsPerPage={ROWS_PER_PAGE}
                siblingCount={0}
                onChangePage={onChangePage}
              />
              : ''}
            </div>
          </TableRow>
        </TableFooter> */}
      </Table>
    </TableContainer>
  );
}

export default GamesList;
