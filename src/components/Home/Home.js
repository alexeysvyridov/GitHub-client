import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types'
import BasicTable from '../Table/Table';
import SearchBar from '../Search-bar/Search-bar';
import GitHubReposService from '../../services';
let patients =  [{
  "id": 0,
  "repo": "http://placehold.it/32x32",
  "age": 23,
  "name": "Bird Ramsey",
  "gender": "male",
  "company": "NIMON",
  "email": "birdramsey@nimon.com",
  "stars": 341224,
  "isActive": false
},
{
  "id": 1,
  "balance": "$2,499.49",
  "repo": "http://placehold.it/32x32",
  "age": 31,
  "name": "Lillian Burgess",
  "gender": "female",
  "stars": 3424,
  "isActive": true
},
{
  "id": 2,
  "balance": "$2,820.18",
  "repo": "http://placehold.it/32x32",
  "age": 34,
  "name": "Kristie Cole",
  "gender": "female",
  "stars": 1114,
  "isActive": false
},
{
  "id": 3,
  "balance": "$3,277.32",
  "repo": "http://placehold.it",
  "age": 30,
  "name": "Leonor Cross",
  "gender": "female",
  "stars": 555114,
  "isActive": true
},
{
  "id": 4,
  "balance": "$1,972.47",
  "repo": "http://placehold.it/32x32",
  "age": 28,
  "name": "Marsh Mccall",
  "gender": "male",
  "stars": 741,
  "isActive": true
}];

const Home = props => {
  const [query, setQuery] = useState('');
  const [loading, setloading] = useState(false);
  const [users, setUsers] = useState([]);
  let gitHubReposService = new GitHubReposService();

  useEffect(() => {
    gitHubReposService
    .getUsers(patients)
      .then((data) => {
        setUsers(data);
      });
  },[]);

  const onHandleInput = (input) => {
    let query = input.target.value.toLowerCase();
    let res =  patients.filter(pa => {
      pa.name = pa.name.toLowerCase()
      return (
                (pa.name && pa.name.includes(query)) ||
                (pa.repo && pa.repo.includes(query))
              )
    });
    setUsers(res)

    // setloading(true);
    // setQuery(query);
  };
  return (
    <div style={{maxWidth: '600px', marginLeft: '10px'}}>
      <SearchBar users={users} onHandleInput={onHandleInput}/>
      <BasicTable users={users}/>
    </div>
  )
}



Home.propTypes = {

}

export default Home
