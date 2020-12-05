import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import BasicTable from '../Table/Table';
import SearchBar from '../Search-bar/Search-bar';
import GitHubReposService from '../../services';
import Modal from '../Modal/Modal';
import './Home.css';
const Home = () => {
  const [query, setQuery] = useState('');
  const [loading, setloading] = useState(false);
  const [users, setUsers] = useState([]);
  let gitHubReposService = new GitHubReposService();
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [favorite, setFavorite] = useState([]);
  const handleClickOpen = (user) => {
   setOpen(true);
   setCurrentUser(user);
  }
  const addUserToFavorite = (user) => {
    setFavorite(favorite => favorite.concat(user))
  }
  const removeUserFromFavorite = (index) => {
    setFavorite(favorite => favorite.slice(index, 1))
  }
  const handleClose = () => {
   setOpen(false);
   setCurrentUser({})
  }
  
  useEffect(() => { 
    if(users.length == 0) {
      gitHubReposService
      .getUsers()
        .then((data) => {
         let item = data.items;
          setUsers(item);
        });
    }
  },[users]);

  const onHandleInput = (input) => {
    setloading(true);
    let query = input.target.value.toLowerCase();
    let _url  = `https://api.github.com/search/users?q=${query}/repos`;
    gitHubReposService
    .getUsers(_url)
      .then((data) => {
       let item = data.items;
       console.log(item);
        setUsers(item);
      });
    setTimeout(() => {
      setloading(false);
    })
  };

  return (
    <div style={{display:"flex", width:'100%'}}>
      <div className="main-home">
        <div className="search-bar">
          <SearchBar users={users} onHandleInput={onHandleInput}/>
        </div>
        <div className="table">
          <BasicTable
          setCurrentUser={setCurrentUser} 
          users={users}
          loading={loading}
          handleClickOpen={handleClickOpen} 
          />
        </div>
      </div>
      <div className="modal" style={{display:"inline-block", width: '50%'}}>
        {open && <Modal user={currentUser} handleClose={handleClose}/>}
      </div>
    </div>
  )
}



Home.propTypes = {

}

export default Home
