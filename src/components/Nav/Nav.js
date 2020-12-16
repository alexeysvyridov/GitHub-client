import React from 'react';
import { NavLink } from 'react-router-dom';
import './Nav.css';
const Nav = ({staredUsers}) => {
  return (
    <nav>
    <ul className="navigation">
      <li className="left-side">
        <span>Github Client</span> 
      </li>
      <li className="right-side">
          <NavLink  to="/" className="tab" activeClassName="selected" exact>
            Top Repo
          </NavLink> 
          <NavLink className="tab favorite" to="/favorite" activeClassName="selected">
            Favorite Repo
            <span className="stared-length">{staredUsers?.length}</span> 
          </NavLink>
      </li>
    </ul>
  </nav>
  )
} 
export  default Nav;