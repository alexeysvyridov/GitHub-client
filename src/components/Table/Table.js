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

const BasicTable = ({users, loading}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
   setOpen(true)
  }
  const handleClose = () => {
   setOpen(false)
  }
  
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
    <div>
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
            {users.map((row, index) => (
              <TableRow key={row.id} onClick={() => handleClickOpen()}>
                <TableCell align="right">{index}</TableCell>
                <TableCell align="right">{row.full_name}</TableCell>
                <TableCell align="right">{row.stargazers_count}</TableCell>
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
 
}

export default BasicTable;