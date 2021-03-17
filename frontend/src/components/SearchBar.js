import { TextField, Button, Grid } from '@material-ui/core'
import React, { useState } from 'react'

function SearchBar({initialText, update, submit}) {
  const [search, setSearch] = useState(initialText ? initialText : '');

  const onChange = (event, newValue) => {
    if (newValue != search) {
      setSearch(newValue);
      if (update) {
        update(search);
      }
    }
  }

  const onSubmit = () => {
    submit(search);
  }

  return (
    <form style={{margin: 'auto'}}>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
        wrap="nowrap"
      >
        <Grid item width={'70%'}>
          <TextField 
            id="txtSearch" name="txtSearch" 
            variant="outlined" 
            value={search}
            onChange={onChange}
          />
        </Grid>
        <Grid item width={'30%'}>
          <Button onClick={submit} variant="outlined">Search</Button>
        </Grid>
      </Grid>
      
    </form>
  )
}

export default SearchBar
