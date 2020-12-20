import React from "react";
import PropTypes from "prop-types";
import Cart from "../Cart/Cart";
import { connect } from "react-redux";
import "./Favorite.css";

const Favorite = (props) => {
  let {
    staredUsers,
  } = props;

  return (
    <div className="main-favorite">
      {staredUsers &&
        staredUsers.map((currentUser) => {
          return (
            <Cart key={currentUser.id}
              staredUsers ={staredUsers}
              currentUser={currentUser}
            />
          );
        })}
    </div>
  );
};
const mapStateToProps = (state) => {
  return { ...state };
};
Favorite.propTypes = {
  staredUsers: PropTypes.array.isRequired,
};
export default connect(mapStateToProps)(Favorite);
