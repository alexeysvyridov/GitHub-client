
import React, {useEffect} from 'react';
import {BrowserRouter as Router, NavLink, Switch, Route,activeClassName } from 'react-router-dom';
import {connect} from 'react-redux';
import Nav from '../Nav/Nav';
import Fovorite from '../Favorite/Favorite';
import Home from '../Home/Home';
import './App.css';

function App() {
  
  return (
  <div className="App">
  <Router>
    <Nav/>
    <Switch>
      <Route path="/" component={Home} exact/>
      <Route path="/favorite" component={Fovorite}/>
    </Switch>
    </Router>
    </div>
  );

}

export default App;
