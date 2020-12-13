
import React, {useState,useEffect} from 'react';
import {BrowserRouter as Router, NavLink, Switch, Route, activeClassName } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import Fovorite from '../Favorite/Favorite';
import Home from '../Home/Home';
import GitHubReposService from '../../services';
import {setStared, deleteStar, updateStar} from '../../actions';
import './App.css';

function App({users, setStared, deleteStar, updateStar}) {
 
  let objPops = {
    users,
    setStared,
    updateStar,
    deleteStar,
  }
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
          <Fovorite {...objPops}/>
      </Route>
    </Switch>
    </Router>
    </div>
  );
} 
const mapStateToProps = (state) => {
  return {
    users: state.users,
    user: state.user
  }
}
const mapDispatchToProps= {
  setStared,
  deleteStar,
  updateStar
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
