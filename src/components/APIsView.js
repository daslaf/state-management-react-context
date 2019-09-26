import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import FavoriteCategoriesContext from '../context/favorite-categories.context';
import PublicAPIsContext from '../context/public-apis.context';

import Spinner from './Spinner';

const APIsView = () => {
  const { favoriteCategories } = useContext(FavoriteCategoriesContext);
  const { data, getAPIsByCategory } = useContext(PublicAPIsContext);

  useEffect(() => {
    if (favoriteCategories.keys.length) {
      favoriteCategories.keys.forEach(id => {
        if (typeof data[id] === 'undefined') {
          getAPIsByCategory(favoriteCategories.data[id]);
        }
      });
    }
  }, [data, favoriteCategories, getAPIsByCategory]);

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
        <APIList favoriteCategories={favoriteCategories} data={data} />
      )}
    </>
  );
};

const APIList = React.memo(({ data, favoriteCategories }) => {
  return favoriteCategories.keys.map(categoryId => (
    <section key={categoryId} style={{ paddingTop: '1rem' }}>
      <h2 className="ui-subtitle">{favoriteCategories.data[categoryId].name}</h2>

      {data[categoryId] && data[categoryId].error ? (
        <div className="ui-card" style={{ textAlign: 'center' }}>
          <span className="ui-shrug" role="img" aria-label="Shrug">
            ¯\_(ツ)_/¯
          </span>
          <h2 className="ui-title">Oops! Something went wrong</h2>
          <p className="ui-text">Error: {data[categoryId].error.message}</p>
        </div>
      ) : data[categoryId] && data[categoryId].isLoaded ? (
        <>
          <ul className="ui-apis">
            {data[categoryId].items.map(item => (
              <li key={item.API + item.Link} className="ui-api">
                <a
                  href={item.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ui-card ui-api__content ui-flex"
                >
                  <div>
                    <h2 className="ui-api__name">{item.API}</h2>
                    <p className="ui-api__description">{item.Description}</p>
                  </div>
                  <span className="material-icons">keyboard_arrow_right</span>
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div style={{ height: 180, position: 'relative' }}>
          <Spinner />
        </div>
      )}
    </section>
  ));
});

export default APIsView;
