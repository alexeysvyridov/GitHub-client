
import React, {useState,useEffect} from 'react';
import {BrowserRouter as Router, NavLink, Switch, Route, activeClassName } from 'react-router-dom';
import {connect} from 'react-redux';
import Nav from '../Nav/Nav';
import Fovorite from '../Favorite/Favorite';
import Home from '../Home/Home';
import GitHubReposService from '../../services';
import './App.css';

function App() {
  let gitHubReposService = new GitHubReposService();
  const [stared, setStared] = useState([]);
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
  return (
  <div className="App">
  <Router>
    <Nav stared={stared}/>
    <Switch>
      <Route exact path="/">
          <Home stared={stared} 
          setStared={setStared}
           updateStar={updateStar} 
           deleteStar={deleteStar}
          checkStarring={checkStarring}/>
      </Route>
      <Route path="/favorite">
          <Fovorite stared={stared}
           setStared={setStared}
           updateStar={updateStar}
           deleteStar={deleteStar}
           checkStarring={checkStarring} 
          />
      </Route>
    </Switch>
    </Router>
    </div>
  );

}

export default App;
