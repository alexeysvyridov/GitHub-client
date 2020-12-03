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
const useStyles = makeStyles({
  table: {
    width: 450,
  }
});

const BasicTable = ({users}) => {


  const classes = useStyles();
    if(!users || users.length === 0)  {
      return (
        <div style={{width: '100%', 'textAlign': 'center'}}>
          <CircularProgress disableShrink />
        </div>
      ) 
    }
  
  return (
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
              <TableCell align="right">{row.name}/{row.repo}</TableCell>
              <TableCell align="right">{row.stars}</TableCell>
              <TableCell align="right">
                <span className="fa fa-star checked"></span>
               </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> 
  )
}

export default BasicTable;