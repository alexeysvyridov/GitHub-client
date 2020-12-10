
import React, {useState,useEffect} from 'react';
import {BrowserRouter as Router, NavLink, Switch, Route, activeClassName } from 'react-router-dom';
import { connect } from 'react-redux';
import Nav from '../Nav/Nav';
import Fovorite from '../Favorite/Favorite';
import Home from '../Home/Home';
import GitHubReposService from '../../services';
import {setStared} from '../../actions'
import './App.css';

function App({stared, setStared}) {
  console.log(stared)
  let gitHubReposService = new GitHubReposService();
  useEffect(() => {
    gitHubReposService
    .checkStared('https://api.github.com/user/starred')
    .then((data) => {
     setStared(data)
    })
  },[]);
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
  let checkStarring = (user) => stared.findIndex(person => person.full_name === user.full_name) > -1;
  let objPops = {
    stared,
    setStared,
    updateStar,
    deleteStar,
    checkStarring
  }
  if(!stared) {
    return <div>stared not downloaded yet!!!</div>
  }
  return (
  <div className="App">
  <Router>
    <Nav stared={stared}/>
    <Switch>
      <Route exact path="/">
          <Home {...objPops}/>
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
    stared: state.stared
  }
}
export default connect(mapStateToProps, {setStared})(App);
