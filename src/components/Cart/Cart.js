import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import './Cart.css';
 const Cart = ({currentUser, handleClose, deleteStar,updateStar, checkStarring}) => {
  return (
    <div className="container-modal">
      <header>
        <div className="header-mobal">
            <a href={`${currentUser.repos_url}`}>{currentUser.full_name}</a>
            <div style={{display:"flex", alignItems: 'center'}}>
              <div style={{position: "relative", width: '40px'}}>
              {checkStarring(currentUser) ?
                    (<input type="checkbox" className="star" title="bookmark page" checked={true}  onChange={() => deleteStar(currentUser)} />) 
                                        :    
                    (<input type="checkbox" className="star" title="bookmark page" checked={false} onChange={() => updateStar(currentUser)} />)
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
          <Button onClick={() => handleClose(currentUser, false)}
          variant="contained" 
          color="primary" disableElevation>
            Delete from favorite
          </Button>
         :
         <Button onClick={() => handleClose(currentUser, true)}
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
  currentUser: PropTypes.object.isRequired,
  updateStar: PropTypes.func.isRequired,
  deleteStar: PropTypes.func.isRequired,
  checkStarring: PropTypes.func.isRequired,
}
export default Cart;