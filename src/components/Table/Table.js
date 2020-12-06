import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import Spinner from '../Spinner/Spinner';
import Service from '../../services';
import './Table.css'
const useStyles = makeStyles({
  table: {
    width: 450,
  }
});

const BasicTable = ({users, loading, handleClickOpen, stared}) => {
  const classes = useStyles();
  const [star, setStar] = useState({});
  const service = new Service();
  const updateStar = (ownerName, repoName) => {
    service.starring(ownerName, repoName)
  };
  const deleteStar = (ownerName, repoName) => {
    service.unStarring(ownerName, repoName)
  };

  if(loading)  {
    return (
      <div style={{width: '100%', 'textAlign': 'center'}}>
        <CircularProgress disableShrink />
      </div>
    ) 
  }
  if(users.length === 0 && !loading) {
   return <h1>Has no data in the list....</h1>
  }  
  if(!loading) {
    return (
    <div style={{display: 'flex', width:'750px', height:'600px', overflow:'auto'}}>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow className="background">
              <TableCell align="right">№</TableCell>  
              <TableCell align="right">Repo</TableCell>
              <TableCell align="right">Stars</TableCell>
              <TableCell align="right">Fav</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell align="right"><span className="couter">{index}</span> </TableCell>
                <TableCell align="right" onClick={() => handleClickOpen(user)}>{user.full_name}</TableCell>
                <TableCell align="right">{user.stargazers_count}</TableCell>
                <TableCell align="right">
                  <span className="fa fa-star"  onClick={() => updateStar(user.owner.login, user.name)}></span>
                  {/* <span className="fa fa-star checked"  onClick={() => deleteStar(user.owner.login, user.name)}></span>: */}
                 </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> 
    </div>
    )
  }
 
}

export default BasicTable;