import React from 'react';
import { NavLink } from 'react-router-dom';

const activeStyle = { color: 'blue' };

const AppNavigation = () => {
  return (
    <nav>
      <NavLink activeStyle={activeStyle} exact to='/'>
        APIs
      </NavLink>
      <NavLink activeStyle={activeStyle} exact to='/categories'>
        My Categories
      </NavLink>
    </nav>
  )
}

export default AppNavigation;