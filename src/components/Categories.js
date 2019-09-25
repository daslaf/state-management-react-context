import React, { useContext } from 'react';

import CategoriesContext from '../context/categories.context';
import FavoriteCategoriesContext from '../context/favorite-categories.context';

const Categories = () => {
  const categories = useContext(CategoriesContext);
  const { favoriteCategories, toggleCategory } = useContext(FavoriteCategoriesContext);

  return (
    <>
      <h1>All Categories</h1>
      {categories.map(category => (
        <div key={category.id} style={ favoriteCategories.data[category.id] ? { color: 'red' } : null }>
          <p>{category.name}</p>
          <button onClick={() => toggleCategory(category)}>Toggle</button>
        </div>
      ))}
    </>
  )
}

export default Categories;