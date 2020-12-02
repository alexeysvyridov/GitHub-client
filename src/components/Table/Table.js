import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import star from '../../images/star.jpg';
let users =  [{
  "id": 0,
  "repo": "http://placehold.it/32x32",
  "age": 23,
  "name": "Bird Ramsey",
  "gender": "male",
  "company": "NIMON",
  "email": "birdramsey@nimon.com",
  "stars": 341224
},
{
  "id": 1,
  "balance": "$2,499.49",
  "repo": "http://placehold.it/32x32",
  "age": 31,
  "name": "Lillian Burgess",
  "gender": "female",
  "stars": 3424
},
{
  "id": 2,
  "balance": "$2,820.18",
  "repo": "http://placehold.it/32x32",
  "age": 34,
  "name": "Kristie Cole",
  "gender": "female",
  "stars": 1114
},
{
  "id": 3,
  "balance": "$3,277.32",
  "repo": "http://placehold.it",
  "age": 30,
  "name": "Leonor Cross",
  "gender": "female",
  "stars": 555114
},
{
  "id": 4,
  "balance": "$1,972.47",
  "repo": "http://placehold.it/32x32",
  "age": 28,
  "name": "Marsh Mccall",
  "gender": "male",
  "stars": 741
}];


const useStyles = makeStyles({
  table: {
    width: 450,
  }
});

export default function BasicTable() {



  const classes = useStyles();
  

  return (
    <div style={{maxWidth: '600px', marginLeft: '10px'}}>
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">№</TableCell>  
            <TableCell align="right">Repo</TableCell>
            <TableCell align="right">Stars</TableCell>
            <TableCell align="right">Fav</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.repo}</TableCell>
              <TableCell align="right">{row.stars}</TableCell>
              <TableCell align="right">
                <span className="fa fa-star checked"></span>
               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
