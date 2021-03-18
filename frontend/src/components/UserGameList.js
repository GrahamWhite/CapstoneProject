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

function GameItem({game, index, onRemove, onFavourite}) {
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

  useEffect(() => {
    setFavourite(game.favourite);
    setSelected(game.selected);
  }, [game.favourite])

  function onRemoveItem(index) {
    setSelected(!false);
    onRemove(index);
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
            startIcon={<StarIcon />}
            onClick={() => onFavourite(index)}
          >
            Favourite
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={onRemoveItem}
          >
            Remove
          </Button>
        </CardActions>
      ) : (
        ""
      )}
    </Card>
  );
}

function UserGameList(props) {
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
      name: "Apex Legends",
      platform: "Steam, Origin",
      img: "/images/ApexLogo.png",
      favourite: false,
      selected: false,
    },
    {
      id: "1",
      name: "Rainbow 6 Siege",
      platform: "Steam, Ubisoft",
      img: "",
      favourite: false,
      selected: false,
    },
    {
      id: "2",
      name: "Deep Rock Galactic",
      platform: "Steam",
      img: "",
      favourite: true,
      selected: false,
    },
    {
      id: "3",
      name: "Noita",
      platform: "Steam",
      img: "",
      favourite: false,
      selected: false,
    },
    {
      id: "4",
      name: "Polybius",
      platform: "Steam, 80's Arcade Machine",
      img: "",
      favourite: false,
      selected: false,
    },
    {
      id: "5",
      name: "Devil Daggers",
      platform: "Steam",
      img: "",
      favourite: false,
      selected: false,
    },
    {
      id: "6",
      name: "Ori & the blind forestc",
      platform: "Steam",
      img: "",
      favourite: false,
      selected: false,
    },
    {
      id: "7",
      name: "Enter The Gungeon",
      platform: "Steam",
      img: "",
      favourite: false,
      selected: false,
    },
    {
      id: "8",
      name: "Hot Tub Time Machine",
      platform: "Film, Movie",
      img: "",
      favourite: false,
      selected: false,
    },
  ];

  const ROWS_PER_PAGE = 5;

  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [page, setPage] = useState(0);
  //const [search, setSearch] = useState("");
  // "/user_game?username=graham_white"
  const url =
    "http://ec2-35-183-39-123.ca-central-1.compute.amazonaws.com:3000";

  //Events
  async function getData() {
    let username = 'graham_white' //localStorage.getItem("username");
    const queryString = window.location.search;
    if (!username) return;

    let isValid = false;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      //body: JSON.stringify(username),
    };

    let responseData = "";
    try {
      console.log(username);
      let response = await fetch(url + "/select_usergames?username=graham_white", options);
      console.log(response);
      responseData = await response.json();

      console.log(responseData);

      isValid = true;
    } catch (err) {
      console.log(responseData);
      console.log(err);
    }

    if (isValid) {
      console.log("coooool");
      return responseData;
    }
    else {
      return [];
    }
  }

  useEffect(() => {
    fetch(url + "/select_usergames?username=" + localStorage.getItem("username"))
      .then(response => response.json())
      .then(data => setGames(data));
    console.log('lol');
  }, [])

  const onChange = useCallback((updatedGame) => {
    const gameIndex = games.findIndex((emp) => emp.id === updatedGame.id);
    games[gameIndex] = updatedGame;
    setGames([...games]);
  }, []);

  const onChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // List changing functions
  const favouriteGame = index => {
    const newGames = [...games];
    let favourited = newGames[index].favourite;
    newGames[index].favourite = !favourited;
    setGames(newGames);
  }

  const removeGame = index => {
    const newGames = [...games];
    newGames.splice(index, 1);
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
                  onFavourite={favouriteGame}
                  onRemove={removeGame}
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
                siblingCount={0}
                onChangePage={onChangePage}
              />
              : ''}
            </div>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default UserGameList;
