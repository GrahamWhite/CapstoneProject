import { Grid, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { useEffect, useState } from 'react'

function GameItem({game, onUpdate}) {
  const updateHandler = dummyData => onUpdate({ ...game, ...dummyData});

  return (
    <Grid item container spacing={2}>
      <Grid item xs={6}>
        {game.name}
      </Grid>
      <Grid item xs={6}>
        {game.platform}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    
  }
}));

function GameList(props) {
  const classes = useStyles();

  const dummyData = [{
    id: "1",
    name: "Apex Legends",
    platform: "Steam, Origin"
  },
  {
    id: "2",
    name: "Rainbow 6 Siege",
    platform: "Steam, Ubisoft"
  },
  {
    id: "3",
    name: "Deep Rock Galactic",
    platform: "Steam"
  },
  {
    id: "4",
    name: "as123",
    platform: "asdasdzxc"
  },
  {
    id: "5",
    name: "a1234",
    platform: "asdazxcv"
  },
  ];

  const [games, setgames] = useState(dummyData);

  const onChange = React.useCallback(updatedGame => {
    const gameIndex = games.findIndex(emp => emp.id === updatedGame.id)
    games[gameIndex] = updatedGame;
    setgames([...games]);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {games.map((game) => (
            <TableRow key={game.id}>
              <TableCell component="th" scope="game" rowSpan={1}>
                {game.name}
              </TableCell>
              <TableCell align="right">{game.platform}</TableCell>
              <TableCell align="right">{game.platform}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default GameList
