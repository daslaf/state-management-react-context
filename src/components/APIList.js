import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import FavoriteCategoriesContext from '../context/favorite-categories.context';

const APIList = ({ items = [] }) => {
  const { favoriteCategories } = useContext(FavoriteCategoriesContext);

  if (favoriteCategories.keys.length === 0) {
    return (
      <>
        <h1>No has seleccionado ninguna categoría</h1>
        <NavLink to="/categories">Seleccionar -></NavLink>
      </>
    );
  }

  return <h1>My APIs: For {favoriteCategories.keys.length} categories there are some APIs</h1>;
};

export default APIList;
