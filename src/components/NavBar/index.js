import './index.scss'
import React from 'react';
import { NavLink } from "react-router-dom";


function NavBar() {
  return (
    <nav>
      <ul className='nav_list'>
        <li className='nav_item'>
          <NavLink 
            className="nav_link"
            to="/engeious/"
            activeclassname="active"
          >Posts</NavLink>
        </li>
        <li className='nav_item'>
          <NavLink 
            to="/engeious/users" 
            className="nav_link"
            activeclassname="active"
          >Users</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar;