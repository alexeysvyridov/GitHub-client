
import React, {useState,useEffect} from 'react';
import {BrowserRouter as Router, NavLink, Switch, Route, activeClassName } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Nav from '../Nav/Nav';
import Fovorite from '../Favorite/Favorite';
import Home from '../Home/Home';
import GitHubReposService from '../../services';
import {
  setUsers, 
  deleteStar, 
  updateStar, 
  fetchUsers, 
  fetchStaredUsers
} from '../../actions';
import './App.css';

function App({users, staredUsers, fetchUsers, fetchStaredUsers}) {
  useEffect(() => {
    fetchUsers()
  },[]);

  useEffect(()=> {
    fetchStaredUsers()
  },[]);


  if(!users) {
    return <div>stared not downloaded yet!!!</div>
  }

  return (
  <div className="App">
  <Router>
    <Nav staredUsers={staredUsers}/>
    <Switch>
      <Route exact path="/">
          <Home/>
      </Route>
      <Route path="/favorite">
          <Fovorite/>
      </Route>
    </Switch>
    </Router>
    </div>
  );
} 
const mapStateToProps = ({users, staredUsers}) => {
  return {
    staredUsers,
    users
  }
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchUsers, fetchStaredUsers}, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
