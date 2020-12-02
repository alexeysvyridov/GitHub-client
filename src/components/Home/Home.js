import React from 'react'
import PropTypes from 'prop-types'
import Table from '../Table/Table';
import SearchBar from '../Search-bar/Search-bar';
const Home = props => {
  return (
    <div>
      <SearchBar/>
      <Table />
    </div>
  )
}

Home.propTypes = {

}

export default Home
