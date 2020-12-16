import React, {useEffect} from "react";
import PropTypes from "prop-types";
import Cart from "../Cart/Cart";
import { connect } from "react-redux";
import "./Favorite.css";
import { bindActionCreators } from "redux";
import {deleteStar,updateStar} from '../../actions';
const Favorite = (props) => {
  let {
    staredUsers,
    deleteStar,
    updateStar,
  } = props;


  return (
    <div className="main-favorite">
      {staredUsers &&
        staredUsers.map((currentUser) => {
          return (
            <Cart key={currentUser.id}
              staredUsers ={staredUsers}
              currentUser={currentUser}
              deleteStar={deleteStar}
              updateStar={updateStar}
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
    { updateStar, deleteStar},
     dispatch)
}
Favorite.propTypes = {
  staredUsers: PropTypes.array.isRequired,
  updateStar: PropTypes.func.isRequired,
  deleteStar: PropTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
