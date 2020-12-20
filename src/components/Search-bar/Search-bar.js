import React, {useState, useCallback} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash'
import './Search-bar.css';
import GitHubReposService from '../../services';
import { setQuery } from '../../actions';
let gitHubReposService = new GitHubReposService();
const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      width: '750px',
    },
  },
}));
 const SearchBar = ({fetchUsersData, users, setQuery}) => {
  const sendQuery = (query) => {
    let url  = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=10`;
    fetchUsersData(url);
    setQuery(query);
   };
 
   const debouncer = useCallback(_.debounce(q => sendQuery(q), 1500), []); 
   const onHandleInput = (input) => {
     let query = input.target.value.toLowerCase();
     debouncer(query);
   };
 
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

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({
      fetchUsersData:gitHubReposService.fetchUsersData,
      setQuery
    }, dispatch)
}
export default connect(null, mapDispatchToProps)(SearchBar);