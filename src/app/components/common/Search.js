import { FormControl, TextField, useMediaQuery } from '@mui/material';
import React, {  } from 'react'


export const Search = ({ infoText, placeHolder, loading, onChange }) => {
  const mediumViewport = useMediaQuery('(max-width:768px)');
  
  return (
    <FormControl >
      <TextField
        id="Search"
        label="Search"
        type="text"
        autoComplete="off"
        size='small'
        disabled={loading}
        onChange={onChange}
      />
    </FormControl>
  )
}
