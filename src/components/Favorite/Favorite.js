import React from 'react';
import PropTypes from 'prop-types';
import Cart from '../Cart/Cart';
import './Favorite.css';
const Favorite = (props) => {
  const {
    stared,
    setStared,
    updateStar, 
    deleteStar, 
    checkStarring } = props;
    
  console.log(stared);
  return (
    <div className="main-favorite">
      {stared && stared.map((currentUser) => {
        <div>{currentUser}</div>
        return (
          <Cart key={currentUser.id}
                currentUser={currentUser}
                updateStar={updateStar}
                deleteStar={deleteStar}
                checkStarring={checkStarring}
            />
        )
      })}
    </div>
  )
}

Favorite.propTypes = {

}

export default Favorite
