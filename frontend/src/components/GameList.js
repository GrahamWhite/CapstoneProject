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
import { Pagination } from '@material-ui/lab'
import React, { useEffect, useState, useCallback } from "react";
import SearchBar from "material-ui-search-bar"; // https://www.npmjs.com/package/material-ui-search-bar
import StarIcon from "@material-ui/icons/Star";
import DeleteIcon from "@material-ui/icons/Delete";

function GameItem(props) {
  const useStyles = makeStyles((theme) => ({
    root: {},
    fullHeight: {
      height: '178px',
    },
    tableItem: {
      minHeight: '178px',
    },
    cover: {
      width: "151",
    },
  }));
  const classes = useStyles();

  const imgPlaceholder =
    "https://st3.depositphotos.com/13159112/17145/v/600/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";

  // const updateHandler = dummyData => onUpdate({ ...props.game, ...props.dummyData});

  const [selected, setSelected] = useState(false);

  function onSelected(event) {
    setSelected(!selected);
  }

  return (
    <Card className={`${classes.card} ${classes.tableItem}`} variant="outlined">
      <CardActionArea className={!selected ? classes.fullHeight : ''}
        onClick={() => {
          setSelected(!selected);
        }}
      >
        <CardContent>
          <CardMedia
            className={classes.cover}
            image={imgPlaceholder /*process.env.PUBLIC_URL + game.img*/}
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
      {selected ? (
        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="contained"
            startIcon={<StarIcon />}
          >
            Favourite
          </Button>
          <Button
            size="small"
            color="secondary"
            variant="contained"
            startIcon={<DeleteIcon />}
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

function GameList(props) {
  const useStyles = makeStyles((theme) => ({
    root: {},
    cover: {
      width: "151",
    },
  }));
  const classes = useStyles();

  const dummyData = [
    {
      id: "1",
      name: "Apex Legends",
      platform: "Steam, Origin",
      img: "/images/ApexLogo.png",
    },
    {
      id: "2",
      name: "Rainbow 6 Siege",
      platform: "Steam, Ubisoft",
      img: "",
    },
    {
      id: "3",
      name: "Deep Rock Galactic",
      platform: "Steam",
      img: "",
    },
    {
      id: "4",
      name: "Noita",
      platform: "Steam",
      img: "",
    },
    {
      id: "5",
      name: "Polybius",
      platform: "Steam, 80's Arcade Machine",
      img: "",
    },
    {
      id: "6",
      name: "Devil Daggers",
      platform: "Steam",
      img: "",
    },
    {
      id: "7",
      name: "Ori & the blind forestc",
      platform: "Steam",
      img: "",
    },
    {
      id: "8",
      name: "Enter The Gungeon",
      platform: "Steam",
      img: "",
    },
    {
      id: "9",
      name: "Hot Tub Time Machine",
      platform: "Film, Movie",
      img: "",
    },
  ];

  const ROWS_PER_PAGE = 5;

  const [games, setgames] = useState(dummyData);
  const [selectedGame, setSelectedGame] = useState(null);
  const [page, setPage] = useState(0);
  //const [search, setSearch] = useState("");

  const onChange = useCallback((updatedGame) => {
    const gameIndex = games.findIndex((emp) => emp.id === updatedGame.id);
    games[gameIndex] = updatedGame;
    setgames([...games]);
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
          {games
          .slice(page * ROWS_PER_PAGE, page * ROWS_PER_PAGE + ROWS_PER_PAGE)
          .map((game) => (
            <TableRow key={game.id} className={classes.tableItem}>
              <GameItem game={game} />
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <div style={{width: '100%', margin: 'auto'}}>
              <TablePagination
                rowsPerPageOptions={[5]}
                count={games.length}
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

export default GameList;
