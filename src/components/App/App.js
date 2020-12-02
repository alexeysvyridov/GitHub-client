
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Table from '../Table/Table';
import Header from '../Header/Header';
import SearchBar from '../Search-bar/Search-bar';
import './App.css';

function App() {
  // useEffect(() => {
  //   getUsers()
  // })
  // const getUsers = async () => {
  //   try {
  //     let res = await fetch('./users.json')
  //     let users = await res.json();
  //     console.log(users);
  //   } catch(err) {
  //     console.log(err);
  //     throw new Error(err)
  //   }
  // }
  // getUsers()
  return (
    <div className="App">
      <Header />
      <SearchBar/>
      <Table />
    </div>
  );
}

export default App;
