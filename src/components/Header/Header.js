import React from 'react'
import './Header.css';
 const Header = () => {
  return (
    <nav className="navigation">
      <div className="left-side">
       <span>Github Client</span> 
      </div>
      <div className="right-side">
          <div className="tab">Top Repo</div> 
          <div className="tab">Favorite Repo</div>
      </div>
    </nav>
  )
}
export default Header;