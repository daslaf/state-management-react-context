import React, { useContext, useMemo, useState } from 'react';

import CategoriesContext from '../context/categories.context';
import FavoriteCategoriesContext from '../context/favorite-categories.context';

import Spinner from './Spinner';

const includes = term => category => category.name.toLowerCase().indexOf(term.toLowerCase()) !== -1;

const Categories = () => {
  const [search, setSearch] = useState('');

  const { error, isLoaded, items } = useContext(CategoriesContext);
  const { clearAll, favoriteCategories, toggleCategory } = useContext(FavoriteCategoriesContext);

  const categories = useMemo(() => {
    if (!search) return items;

    const includesSearch = includes(search);

    return items.filter(includesSearch);
  }, [items, search]);

  return (
    <>
      <div className="ui-flex">
        <h1 className="ui-title">
          My Categories{' '}
          <small style={{ opacity: 0.5 }}>({favoriteCategories.keys.length} favorited)</small>
        </h1>
        {favoriteCategories.keys.length > 0 && (
          <button className="ui-button" onClick={clearAll} disabled={!isLoaded || error}>
            Clear selection
          </button>
        )}
      </div>

      {error ? (
        <div className="ui-card" style={{ textAlign: 'center' }}>
          <span className="ui-shrug" role="img" aria-label="Shrug">
            ¯\_(ツ)_/¯
          </span>
          <h2 className="ui-title">Oops! Something went wrong</h2>
          <p className="ui-text">Error: {error.message}</p>
        </div>
      ) : isLoaded ? (
        <>
          <hr />
          <CategorySearch
            results={categories.length}
            total={items.length}
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
          <CategoryList
            categories={categories}
            favoriteCategories={favoriteCategories}
            toggleCategory={toggleCategory}
          />
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
};

const CategorySearch = ({ results, total, value, onChange }) => {
  return (
    <div className="ui-flex" style={{ marginBottom: '1.5rem' }}>
      <input
        type="search"
        className="ui-search"
        placeholder="Search category"
        value={value}
        onChange={onChange}
      />

      {value && (
        <p>
          Showing {results} out of {total} categories
        </p>
      )}
    </div>
  );
};

const CategoryList = ({ categories, favoriteCategories, toggleCategory }) => {
  return (
    <ul className="ui-categories">
      {categories.map(category => (
        <li className="ui-category" key={category.id}>
          <label
            className={
              favoriteCategories.data[category.id]
                ? 'ui-card ui-category__content ui-category__content--checked'
                : 'ui-card ui-category__content'
            }
          >
            <input
              className="ui-category__control"
              type="checkbox"
              onChange={() => toggleCategory(category)}
              value={category.id}
              checked={Boolean(favoriteCategories.data[category.id])}
            />
            <p>{category.name}</p>
          </label>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
