import React from 'react';
import { NavLink } from 'react-router-dom';

const AppNavigation = () => {
  return (
    <header className="ui-header">
      <nav>
        <NavLink className="ui-nav__link" activeClassName="ui-nav__link--active" exact to="/">
          APIs
        </NavLink>
        <NavLink
          className="ui-nav__link"
          activeClassName="ui-nav__link--active"
          exact
          to="/categories"
        >
          Categories
        </NavLink>
      </nav>
    </header>
  );
};

export default AppNavigation;
