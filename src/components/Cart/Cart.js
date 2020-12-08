import React, {useState} from 'react'
import './Cart.css';
 const Cart = ({user, handleClose}) => {
  return (
    <div className="container-modal">
      <header>
        <div className="header-mobal">
            <a href={`${user.repos_url}`}>{user.full_name}</a>
            <span>
              <span>
                <i className="fa fa-star" alt="star"/>
              </span>
              <span>{user.stargazers_count}</span>
            </span>
        </div>       
      </header>
      <div className="body-modal">
      <div className="body-row">
        <img className="avatar" src={user.owner.avatar_url} alt="avatar"/>
        <div className="github-link">
          <a href={`${user.repos_url}`}>
          {user.owner.login}
          </a>
          <i className="fa fa-github"></i>
        </div>
      </div>
      </div>
      <p className="block-padding">{user.description}</p>
      <footer className="footer">
        <button onClick={() => handleClose(user)}>Delete from favorite</button>
      </footer>
    </div>
  )
}
export default Cart;