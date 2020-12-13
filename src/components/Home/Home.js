import React, {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types'
import BasicTable from '../Table/Table';
import SearchBar from '../Search-bar/Search-bar';
import GitHubReposService from '../../services';
import {bindActionCreators} from 'redux'
import {deleteStar, updateStar} from '../../actions'
import Cart from '../Cart/Cart';
import './Home.css';
import { fetchUsers } from '../../actions';
import { connect } from 'react-redux';


const Home = (props) => {
  let {users, deleteStar, updateStar, checkStarring} = props;
  const [loading, setloading] = useState(false);
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

  return (
    <div style={{display:"flex", width:'100%'}}>
      <div className="main-home">
        <div className="search-bar">
          <SearchBar/>
        </div>
        <div className="table">
          <BasicTable gitHubReposService={gitHubReposService} />
        </div>
      </div>
      {/* <div className="modal" style={{display:"inline-block", width: '50%'}}>
        {open && <Cart {...objProps}/>}
      </div> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  let {users,loading, _url} = state
  return {users, loading, _url}
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators ({
      updateStar, 
      deleteStar,
    }, dispatch)
}

Home.propTypes = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
