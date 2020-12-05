import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import './Search-bar.css';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: '750px',
    },
  },
}));
 const SearchBar = ({onHandleInput}) => {
  const classes = useStyles();
  return (
    <form className={classes.root} noValidate autoComplete="off">
     <div>
        <TextField id="outlined-search" label="Search field" onChange={onHandleInput} 
        type="search" variant="outlined" placeholder="...search repos" />
     </div>
    </form>
  )
}
export default SearchBar;