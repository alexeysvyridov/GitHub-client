import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import GitHubReposService  from '../../services';
import './Cart.css';
import { setStarring } from '../../actions';
let gitHubReposService = new GitHubReposService()
 const Cart = (props) => {
   let {
     staredUsers,
     currentUser, 
     unStarring, 
     setStarring, 
     handleClose
    } = props;
   let checkStarring = (user) => staredUsers.findIndex(person => person.full_name === user.full_name) > -1;
  return (
    <div className="container-modal" key={currentUser.full_name}>
      <header>
        <div className="header-mobal">
            <a href={`${currentUser.repos_url}`}>{currentUser.full_name}</a>
            <div style={{display:"flex", alignItems: 'center'}}>
              <div style={{position: "relative", width: '40px'}}>
              {checkStarring(currentUser) ?
                    (<input type="checkbox" className="star" title="bookmark page" checked={true}  onChange={() => unStarring(currentUser)} />) 
                                        :    
                    (<input type="checkbox" className="star" title="bookmark page" checked={false} onChange={() => setStarring(currentUser)} />)
                    } 
              </div>
              <span>{currentUser.stargazers_count}</span>
            </div>
        </div>       
      </header>
      <div className="body-modal">
      <div className="body-row">
        <img className="avatar" src={currentUser.owner.avatar_url} alt="avatar"/>
        <div className="github-link">
          <a href={`${currentUser.repos_url}`}>
          {currentUser.owner.login}
          </a>
          <i className="fa fa-github"></i>
        </div>
      </div>
      </div>
      <p className="block-padding">{currentUser.description}</p>
      <footer className="footer">
        {checkStarring(currentUser) ?
          <Button onClick={() => unStarring(currentUser)}
          variant="contained" 
          color="primary" disableElevation>
            Delete from favorite
          </Button>
         :
         <Button onClick={() => setStarring(currentUser)}
          variant="contained" 
          color="primary" disableElevation>
            Add from favorite
          </Button>
        }
      </footer>
    </div>
  )
}

Cart.propTypes = {
  staredUsers: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired,
  unStarring: PropTypes.func.isRequired,
  setStarring: PropTypes.func.isRequired,
}
const mapStateToProps = ({staredUsers}, ownProps) => {
 const {currentUser} = ownProps;
  return {
    staredUsers,
    currentUser, 
  }
}
const mapDispatchToProps = {
  unStarring:gitHubReposService.unStarring,
  setStarring:gitHubReposService.setStarring
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);