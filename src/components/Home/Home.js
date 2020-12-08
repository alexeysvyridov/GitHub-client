import React, {useState, useEffect, useCallback} from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types'
import BasicTable from '../Table/Table';
import SearchBar from '../Search-bar/Search-bar';
import GitHubReposService from '../../services';
import Cart from '../Cart/Cart';
import './Home.css';

const Home = ({stared, setStared, deleteStar, updateStar, checkStarring}) => {
  const [loading, setloading] = useState(false);
  const [users, setUsers] = useState([]);
  let gitHubReposService = new GitHubReposService();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleClickOpen = (user) => {
   setOpen(true);
   setCurrentUser(user);
  };

  const handleClose = (user, isAdd) => {
   isAdd ? updateStar(user) : deleteStar(user); 
   setOpen(false);
   setCurrentUser({});
  };

  const sendQuery = (query) => {
    let _url  = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=10`;
    gitHubReposService
    .getUsers(_url)
      .then((data) => {
       let item = data.items;
        setUsers(item);
      })

    setTimeout(() => {
      setloading(false);
    });
  };
  useEffect(() => {
    gitHubReposService
    .checkStared('https://api.github.com/user/starred')
    .then((data) => {
     setUsers(data)
    })
  },[]);

  const debouncer = useCallback(_.debounce(q => sendQuery(q), 1500), []); 
  const onHandleInput = (input) => {
    setloading(true);
    let query = input.target.value.toLowerCase();
    debouncer(query);
  };

  let objProps = {
    handleClickOpen,
    users,
    loading,
    stared,
    setStared,
    updateStar,
    deleteStar,
    currentUser,
    checkStarring,
    currentUser,
    handleClose
  }
  return (
    <div style={{display:"flex", width:'100%'}}>
      <div className="main-home">
        <div className="search-bar">
          <SearchBar users={users} onHandleInput={onHandleInput}/>
        </div>
        <div className="table">
          <BasicTable {...objProps} />
        </div>
      </div>
      <div className="modal" style={{display:"inline-block", width: '50%'}}>
        {open && <Cart {...objProps}/>}
      </div>
    </div>
  )
}



Home.propTypes = {

}

export default Home
