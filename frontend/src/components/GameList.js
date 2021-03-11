import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import React, { useEffect, useState, useCallback } from 'react'
import SearchBar from "material-ui-search-bar"; // https://www.npmjs.com/package/material-ui-search-bar

function GameItem(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      
    },
    cover: {
      width: '151'
    }
  }));
  const classes = useStyles();

  const imgPlaceholder = "https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";

  // const updateHandler = dummyData => onUpdate({ ...props.game, ...props.dummyData});

  const [selected, setSelected] = useState(false);

  return (
    <Card className={classes.card}
      variant="outlined">
      <CardActionArea
        onClick = {() => {setSelected(!selected)}}>
        <CardContent>
          <CardMedia
            className={classes.cover}
            image={imgPlaceholder/*process.env.PUBLIC_URL + game.img*/}
            />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {props.game.name}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {props.game.platform}
              </Typography>
            </CardContent>
          </div>
        </CardContent>
      </CardActionArea>
      {
        selected ?
        <CardActions>
          <Button size="small" color="primary">
            Favourite
          </Button>
          <Button size="small" color="red">
            Delete
          </Button>
        </CardActions>
        : ""
      }
      
    </Card>
  );
}

function GameList(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      
    },
    cover: {
      width: '151'
    }
  }));
  const classes = useStyles();

  const dummyData = [{
    id: "1",
    name: "Apex Legends",
    platform: "Steam, Origin",
    img: '/images/ApexLogo.png'
  },
  {
    id: "2",
    name: "Rainbow 6 Siege",
    platform: "Steam, Ubisoft",
    img: ''
  },
  {
    id: "3",
    name: "Deep Rock Galactic",
    platform: "Steam",
    img: ''
  },
  {
    id: "4",
    name: "Noita",
    platform: "Steam",
    img: ''
  },
  {
    id: "5",
    name: "Polybius",
    platform: "Steam, 80's Arcade Machine",
    img: ''
  },
  ];

  const [games, setgames] = useState(dummyData);
  const [selectedGame, setSelectedGame] = useState(null);
  const [search, setSearch] = useState("");

  const onChange = useCallback(updatedGame => {
    const gameIndex = games.findIndex(emp => emp.id === updatedGame.id)
    games[gameIndex] = updatedGame;
    setgames([...games]);
  }, []);

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
          {games.map((game) => (
            <TableRow key={game.id}>
              <GameItem game={game}/>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GameList
