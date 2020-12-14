
import React, {useState,useEffect} from 'react';
import {BrowserRouter as Router, NavLink, Switch, Route, activeClassName } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import Fovorite from '../Favorite/Favorite';
import Home from '../Home/Home';
import GitHubReposService from '../../services';
import {setUsers, deleteStar, updateStar} from '../../actions';
import './App.css';

function App({users}) {
  if(!users) {
    return <div>stared not downloaded yet!!!</div>
  }
  return (
  <div className="App">
  <Router>
    <Nav users={users}/>
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
const mapStateToProps = (state) => {
  return {
    users: state.users,
  }
}

export default connect(mapStateToProps)(App);
