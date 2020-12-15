import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types'
import BasicTable from '../Table/Table';
import SearchBar from '../Search-bar/Search-bar';
import GitHubReposService from '../../services';
import {bindActionCreators} from 'redux'
import {deleteStar, updateStar} from '../../actions'
import Cart from '../Cart/Cart';
import './Home.css';
import { fetchUsers, handleClickOpen } from '../../actions';
import { connect } from 'react-redux';


const Home = (props) => {
  let {user,users, deleteStar, updateStar, staredUsers, openUser, handleClickOpen} = props;
  const [currentUser, setCurrentUser] = useState({})
  const [open, setOpen] = useState(openUser);

  const handleOpenUser = (user) => {
   setOpen(true);
   setCurrentUser(user);
   handleClickOpen({user, openUser:true})
  };

  const handleClose = (user, isAdd) => {
   isAdd ? updateStar(user) : deleteStar(user); 
   setOpen(false);
   setCurrentUser({});
   handleClickOpen({user, openUser:false})
  };

  let checkStarring = (user) => staredUsers.findIndex(person => person.full_name === user.full_name) > -1;
  return (
    <div style={{display:"flex", width:'100%'}}>
      <div className="main-home">
        <div className="search-bar">
          <SearchBar/>
        </div>
        <div className="table">
          <BasicTable handleOpenUser={handleOpenUser}/>
        </div>
      </div>
      <div className="modal" style={{display:"inline-block", width: '50%'}}>
        {open && <Cart currentUser={currentUser} 
                      handleClose={handleClose} 
                      deleteStar={deleteStar} 
                      updateStar={updateStar} 
                      checkStarring={checkStarring}/>}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  let {user, users,loading, _url, openUser, staredUsers} = state
  return {user, users, loading, _url, openUser, staredUsers}
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({
      updateStar, 
      deleteStar,
      handleClickOpen
    }, dispatch)
}

Home.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
