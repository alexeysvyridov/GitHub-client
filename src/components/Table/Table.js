import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import InfiniteScroll from 'react-infinite-scroll-component'; 
import Test from '../Test/Test'
import './Table.css'
const useStyles = makeStyles({
  table: {
    width: 450,
  }
});

const BasicTable = (props) => {
  const {
    users,
    loading,
    handleClickOpen,
    updateStar, 
    deleteStar,
    checkStarring
    } = props;
  const classes = useStyles();
  
  if(loading)  {
    return (
      <div style={{width: '100% ', 'textAlign': 'center'}}>
        <CircularProgress disableShrink />
      </div>
    ) 
  }
  if(!users || users.length === 0 && !loading) {
   return <h1>Has no data in the list....</h1>
  }  
  if(!loading) {
    return (
    <div style={{display: 'flex', width:'750px', height:'600px', overflow:'auto'}}>
      {/* <TableContainer component={Paper}>
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
                <TableCell align="right"><span className="couter">{index+1}</span> </TableCell>
                <TableCell align="right" style={{cursor:'pointer'}}
                 onClick={() => handleClickOpen(user)}>
                 {user.full_name}
                </TableCell>
                <TableCell align="right">{user.stargazers_count}</TableCell>
                <TableCell align="right" style={{position:'relative'}}>
                 <form>
                 {checkStarring(user) ?
                  (<input type="checkbox" className="star" title="bookmark page" checked={true}  onChange={() => deleteStar(user)} />) 
                                      :    
                  (<input type="checkbox" className="star" title="bookmark page" checked={false} onChange={() => updateStar(user)} />)
                  } 
                  </form>  
                 </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>  */}
      <Test />
    </div>
    )
  }
 
}

export default BasicTable;