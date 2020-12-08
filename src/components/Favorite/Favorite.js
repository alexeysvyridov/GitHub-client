import React from 'react';
import PropTypes from 'prop-types';
import Cart from '../Cart/Cart';
import './Favorite.css';
const Favorite = (props) => {
  return (
    <div className="main-favorite">
      {props.stared && props.stared.map((currentUser) => {
        return (
          <Cart {...props}/>
        )
      })}
    </div>
  )
}

export default Favorite
