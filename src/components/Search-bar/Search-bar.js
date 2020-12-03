import React, {useState} from 'react';
import './Search-bar.css';

 const SearchBar = ({onHandleInput}) => {
  return (
    <div className="search-bar">
      <input type="text" name="search" onChange={onHandleInput} 
        placeholder="...search repos"
      />
    </div>
  )
}
export default SearchBar;