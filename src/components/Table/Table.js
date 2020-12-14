import React, {useEffect} from 'react';
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
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './Table.css'
import { 
  deleteStar,
  updateStar, 
  handleClickOpen, 
  fetchUsers,
  fetchStaredUsers,
  staredUsers
 } from '../../actions';
const useStyles = makeStyles({
  table: {
    width: 450,
  }
});

const BasicTable = (props) => {
  const {
    users,
    staredUsers,
    loading,
    handleClickOpen,
    updateStar, 
    deleteStar,
    fetchUsers,
    fetchStaredUsers, 
    } = props;
  const classes = useStyles();
  let checkStarring = (user) => staredUsers.findIndex(person => person.full_name === user.full_name) > -1;
  useEffect(() => {
    Promise.resolve(fetchUsers())
      .then(fetchStaredUsers)
  }, []);
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
  if(users) {
    return (
    <div style={{display: 'flex', width:'750px', height:'77.5vh', overflow:'auto'}}>
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
      </TableContainer> 
    </div>
    )
  }
 
}
const mapStateToProps = ({users,loading, staredUsers}) => {
  return {users, loading, staredUsers}
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const {gitHubReposService} = ownProps;
    return bindActionCreators ({
      handleClickOpen,
      updateStar, 
      deleteStar,
      fetchUsers: fetchUsers(),
      fetchStaredUsers,
    }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(BasicTable);
