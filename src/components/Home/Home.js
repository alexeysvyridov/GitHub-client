import React, {useState, useEffect, useCallback} from 'react';
import _ from 'lodash'
import PropTypes from 'prop-types'
import BasicTable from '../Table/Table';
import SearchBar from '../Search-bar/Search-bar';
import GitHubReposService from '../../services';
import Cart from '../Cart/Cart';
import './Home.css';

const Home = () => {
  const [query, setQuery] = useState('');
  const [sentUserQuery, setUserQuery] = useState('')
  const [loading, setloading] = useState(false);
  const [users, setUsers] = useState([]);
  let gitHubReposService = new GitHubReposService();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [favorite, setFavorite] = useState([]);
  const [stared, setStared] = useState([])
  
  const handleClickOpen = (user) => {
   setOpen(true);
   setCurrentUser(user);
  }


  const handleClose = () => {
   setOpen(false);
   setCurrentUser({});
  };

  const sendQuery = (query) => {
    console.log(query);
    let _url  = `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc&per_page=10`;
    gitHubReposService
    .getUsers(_url)
      .then((data) => {
       let item = data.items;
       console.log(item);
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
         let staredId = data.map(repo => repo.id) 
         setStared()
        })
  },[]);

  const debouncer = useCallback(_.debounce(q => sendQuery(q), 1500), []); 
  const onHandleInput = (input) => {
    setloading(true);
    let query = input.target.value.toLowerCase();
    setUserQuery(query);
    debouncer(query);
  };

  let objProps = {
    handleClickOpen,
    users,
    loading,
    stared
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
        {open && <Cart user={currentUser} handleClose={handleClose}/>}
      </div>
    </div>
  )
}



Home.propTypes = {

}

export default Home
