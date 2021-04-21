/*
 *  GamesList.js
 *  Lists all available games saved to the database for the user to interact with.
 *
 *  Revision History
 *      Tyler Mills, 4-20-2021: Init
 */

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
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import SearchBar from "material-ui-search-bar"; // https://www.npmjs.com/package/material-ui-search-bar
import AddIcon from "@material-ui/icons/Add";
import StarIcon from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";
import { backendURL } from "../globals";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { sendAlert } from "../actions";
import { useDispatch } from "react-redux";

function GameItem({game, index, addToUserGames, onRemove}) {
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

      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.contrastText,
    }
  }));
  const classes = useStyles();

  const imgPlaceholder =
    "https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";

  const [selected, setSelected] = useState(false);
  const [favourite, setFavourite] = useState(false);
  const [disableAddButton, setDisableAddButton] = useState(false);

  useEffect(() => {
    setFavourite(game.favourite);
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
          {favourite 
          ? <StarIcon className={classes.favouriteIcon}/> 
          : ''}
          <CardMedia
            className={classes.cover}
            image={imgPlaceholder}
            
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
            color="secondary"
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={() => onRemove(index)}
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

function GamesList() {
  const useStyles = makeStyles((theme) => ({
    root: {},
    cover: {
      width: "151",
    },
  }));
  const classes = useStyles();

  const [games, setGames] = useState([]);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const url = backendURL;

  useEffect(() => {
    if (!search) {
      fetch(url + "/select_games")
        .then(response => response.json())
        .then(data => { 
          setGames(data);
        });
    }
    else {
      fetch(url + "/search_games?name=" + search)
        .then(response => response.json())
        .then(data => { 
          setGames(data); 
        });
    }
    
  }, [search]);

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

    const response = await fetch(backendURL + "/create_usergame", options)

    if (response.ok) {
      dispatch(sendAlert(game.name + ' added to your library!', "success"));
    }
    else {
      dispatch(sendAlert(response.statusText, "success"));
    }
  }

  async function removeGame(index) {
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
    const response = await fetch(url + "/delete_usergame", options);

    if (response.ok) {
      dispatch(sendAlert(game.name + ' removed from your library!', "success"));
    }
    else {
      dispatch(sendAlert(response.statusText, "success"));
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
            <SearchBar
              value={search}
              onChange={(newValue) => setSearch(newValue.trim())}
              />
          </TableRow>
        </TableHead>
        <TableBody>
          {games.length > 0 ? 
            games
            .map((game, index) => (
              <TableRow key={index} className={classes.tableItem}>
                <GameItem 
                  game={game}
                  index={index}
                  url={url}
                  addToUserGames={addGame}
                  onRemove={removeGame}
                  onSelected={onSelected}
                />
              </TableRow>
            ))
          : 'Uh oh, no games loaded'}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default GamesList;
