import React, {useState, useEffect, useCallback} from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types'
import BasicTable from '../Table/Table';
import SearchBar from '../Search-bar/Search-bar';
import GitHubReposService from '../../services';
import Cart from '../Cart/Cart';
import './Home.css';

const Home = () => {
  const [loading, setloading] = useState(false);
  const [users, setUsers] = useState([]);
  let gitHubReposService = new GitHubReposService();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [stared, setStared] = useState([]);

  const deleteStar = (user) => {
    gitHubReposService.unStarring(user.owner.login, user.name)
    user.stargazers_count -= 1;
    let filtredElem = stared.filter(person => person.full_name !== user.full_name && person.id !== user.id)
    setStared(filtredElem)
  };

  const updateStar = (user) => {
    gitHubReposService.starring(user.owner.login, user.name)
    user.stargazers_count += 1;
    setStared((prev) => {
     return [...prev, user]
    })
  };

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
     setStared(data)
    })
  },[]);

  const debouncer = useCallback(_.debounce(q => sendQuery(q), 1500), []); 
  const onHandleInput = (input) => {
    setloading(true);
    let query = input.target.value.toLowerCase();
    debouncer(query);
  };
  let checkStarring = (user) => stared.findIndex(person => person.full_name === user.full_name) > -1;

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
