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
import AddIcon from "@material-ui/icons/Add";
import StarIcon from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";
import { backendURL, ReAuthenticate } from "../globals";

function GameItem({game, index, url, onSelected, addToUserGames}) {
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
    }
  }));
  const classes = useStyles();

  const imgPlaceholder =
    "https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";

  // const updateHandler = dummyData => onUpdate({ ...props.game, ...props.dummyData});

  const [selected, setSelected] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [disableAddButton, setDisableAddButton] = useState(false);

  useEffect(() => {
    setFavourite(game.favourite);
    setSelected(game.selected);
  }, [game.favourite])

  // function addSelected(index) {

  // }

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
          {/* <Button
            size="small"
            color="primary"
            variant="contained"
            startIcon={<StarIcon />}
            onClick={() => onFavourite(index)}
          >
            Favourite
          </Button> */}
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
    
  }, [search]);

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

  // const favouriteGame = index => {
  //   const newGames = [...games];
  //   let favourited = newGames[index].favourite;
  //   newGames[index].favourite = !favourited;
  //   setGames(newGames);
  // }

  async function addGame(index) {
    let game = games[index];

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
    console.log(options);

    // backendURL + "/create_usergame"
    // const thisUrl = "http://ec2-35-183-39-123.ca-central-1.compute.amazonaws.com:3000/create_usergame"
    const response = await fetch(backendURL + "/create_usergame", options)
      //.then(response => response.json());

    console.log('response', response);
      // .then(() => {
      //   setRefresh(true);
      // });
    // const response = await fetch(url + "/create_usergame", options);
    // const data = await response.json();

    // console.log(response);
    // console.log(data);
    // if (response.ok) {
      
    // }
    // else {
    //   console.log(response.statusText);
    // }
  }

  // async function AddFriend(){
  //   const options = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body:JSON.stringify({
  //       username: localStorage.getItem('username'),
  //       friendUsername: user.username
  //     })
  //   }

  //   fetch(backendURL + "/create_friend", options)
  //     .then(response => response.json())
  //     .then(() => {
  //       setRefresh(true);
  //     });
  // }

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
                  addToUserGames={addGame}
                  onSelected={onSelected}
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
                siblingcount={0}
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
