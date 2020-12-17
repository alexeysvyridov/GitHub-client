import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Cart from "../Cart/Cart";
import { connect } from "react-redux";
import "./Favorite.css";
import { bindActionCreators } from "redux";
import {unStarring,setStarring} from '../../services';
const Favorite = (props) => {
  let {
    staredUsers,
    unStarring,
    setStarring,
  } = props;


  return (
    <div className="main-favorite">
      {staredUsers &&
        staredUsers.map((currentUser) => {
          return (
            <Cart key={currentUser.id}
              staredUsers ={staredUsers}
              currentUser={currentUser}
              unStarring={unStarring}
              setStarring={setStarring}
            />
          );
        })}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { ...state };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { setStarring, unStarring},
     dispatch)
}
Favorite.propTypes = {
  staredUsers: PropTypes.array.isRequired,
  setStarring: PropTypes.func.isRequired,
  unStarring: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
