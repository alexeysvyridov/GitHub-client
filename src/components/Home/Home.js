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
    deleteStar, 
    updateStar, 
    staredUsers, 
    openUser, 
    handleClickOpen
  } = props;
  const [currentUser, setCurrentUser] = useState({})
  const [open, setOpen] = useState(openUser);

  const handleOpenUser = (user) => {
   setOpen(true);
   setCurrentUser(user);
   handleClickOpen({user, openUser:true})
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
      {open && <div className="modal" style={{display:"inline-block", width: '50%'}}>
      <Cart         currentUser={currentUser} 
                    deleteStar={deleteStar} 
                    updateStar={updateStar} 
                    staredUsers ={staredUsers}
                    checkStarring={checkStarring}/>
      </div>}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {...state}
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
