import React, { createContext, useCallback } from 'react';
import useLocalStorage from 'react-use-localstorage';

const FavoriteCategoriesContext = createContext();
const { Provider, Consumer } = FavoriteCategoriesContext;

const FavoriteCategoriesProvider = ({ children }) => {
  const [favoriteCategories, setFavoriteCategories] = useLocalStorage('favoriteCategories', JSON.stringify({ keys: [], data: {} }));

  const toggleCategory = useCallback(category => {
    setFavoriteCategories(_previous =>  {
      const previous = JSON.parse(_previous);

      if (previous.data[category.id]) {        
        const keys = previous.keys.filter(id => id !== category.id);

        return JSON.stringify({
          keys,
          data: keys.reduce((acc, id) => ({
            ...acc,
            [id]: previous.data[id]
          }), {}),
        });
      } else {
        return JSON.stringify({
          keys: [ ...previous.keys, category.id ],
          data: {
            ...previous.data,
            [category.id]: category
          }
        })
      }
      });
  }, [setFavoriteCategories]);

  return (
    <Provider value={{ favoriteCategories: JSON.parse(favoriteCategories), toggleCategory }}>{children}</Provider>
  );
}

export default FavoriteCategoriesContext;
export { FavoriteCategoriesProvider, Consumer as FavoriteCategoriesConsumer  };