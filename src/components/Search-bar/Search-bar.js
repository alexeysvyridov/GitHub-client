import React, {useState} from 'react';
import './Search-bar.css';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: '100%',
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