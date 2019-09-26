import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import FavoriteCategoriesContext from '../context/favorite-categories.context';
import PublicAPIsContext from '../context/public-apis.context';

import Spinner from './Spinner';

const APIList = () => {
  const { favoriteCategories } = useContext(FavoriteCategoriesContext);
  const { data, requests, getAPIsByCategory } = useContext(PublicAPIsContext);

  useEffect(() => {
    if (favoriteCategories.keys.length) {
      const categories = favoriteCategories.keys.map(id => favoriteCategories.data[id]);

      categories.forEach(getAPIsByCategory);
    }
  }, [favoriteCategories]);

  return (
    <>
      <div className="ui-flex">
        <h1 className="ui-title">My APIs</h1>
      </div>

      {favoriteCategories.keys.length === 0 ? (
        <div className="ui-card" style={{ textAlign: 'center' }}>
          <h1 className="ui-title">Hey dawg, fav some categories to get started</h1>
          <NavLink className="ui-button" to="/categories">
            Let's go
          </NavLink>
          <br />
        </div>
      ) : (
        favoriteCategories.keys.map(categoryId => (
          <section key={categoryId}>
            <hr />
            <h2>{favoriteCategories.data[categoryId].name}</h2>
            {requests[categoryId] && requests[categoryId].error ? (
              <div className="ui-card" style={{ textAlign: 'center' }}>
                <span className="ui-shrug" role="img" aria-label="Shrug">
                  ¯\_(ツ)_/¯
                </span>
                <h2 className="ui-title">Oops! Something went wrong</h2>
                <p className="ui-text">Error: {requests[categoryId].error.message}</p>
              </div>
            ) : requests[categoryId] && requests[categoryId].isLoaded ? (
              <>
                <ul>
                  {data
                    .filter(item => item.Category === favoriteCategories.data[categoryId].name)
                    .map(item => (
                      <li>{item.API}</li>
                    ))}
                </ul>
              </>
            ) : (
              <div style={{ height: 180, position: 'relative' }}>
                <Spinner />
              </div>
            )}
          </section>
        ))
      )}

      {/* {data.map(item => (
        <p>{item.API}</p>
      ))}
      <h1>Requests</h1>
      <pre>{JSON.stringify(requests, null, 2)}</pre>

      <h1>categories</h1>
      <pre>{JSON.stringify(favoriteCategories.data, null, 2)}</pre> */}
    </>
  );
};

export default APIList;
