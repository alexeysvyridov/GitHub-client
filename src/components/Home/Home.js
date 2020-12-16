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
  let {
    user, 
    updateStar, 
    staredUsers, 
    openUser, 
    handleClickOpen
  } = props;

  const handleOpenUser = (user) => {
   handleClickOpen(user)
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
      {openUser && <div className="modal" style={{display:"inline-block", width: '50%'}}>
        <Cart currentUser={user} 
              updateStar={updateStar} 
              staredUsers ={staredUsers}
              checkStarring={checkStarring}/>
      </div>}
    </div>
  )
}

const mapStateToProps = ({user, staredUsers,openUser}) => {
  return {user, staredUsers,openUser}
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({
      updateStar, 
      deleteStar,
      handleClickOpen
    }, dispatch)
}

Home.propTypes = {
  staredUsers: PropTypes.array.isRequired,
  updateStar: PropTypes.func.isRequired,
  deleteStar: PropTypes.func.isRequired,
  handleClickOpen: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
