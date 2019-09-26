import React, { createContext, useCallback, useMemo } from 'react';
import useLocalStorage from 'react-use-localstorage';

const FavoriteCategoriesContext = createContext();
const { Provider, Consumer } = FavoriteCategoriesContext;

const INITIAL_STATE = { keys: [], data: {} };

const FavoriteCategoriesProvider = ({ children }) => {
  const [favoriteCategories, setFavoriteCategories] = useLocalStorage(
    'favoriteCategories',
    JSON.stringify(INITIAL_STATE)
  );

  const categories = useMemo(() => JSON.parse(favoriteCategories), [favoriteCategories]);

  const toggleCategory = useCallback(
    category => {
      setFavoriteCategories(_previous => {
        const previous = JSON.parse(_previous);

        if (previous.data[category.id]) {
          const keys = previous.keys.filter(id => id !== category.id);

          return JSON.stringify({
            keys,
            data: keys.reduce(
              (acc, id) => ({
                ...acc,
                [id]: previous.data[id],
              }),
              {}
            ),
          });
        } else {
          return JSON.stringify({
            keys: [...previous.keys, category.id],
            data: {
              ...previous.data,
              [category.id]: category,
            },
          });
        }
      });
    },
    [setFavoriteCategories]
  );

  const clearAll = useCallback(() => {
    setFavoriteCategories(JSON.stringify(INITIAL_STATE));
  }, [setFavoriteCategories]);

  return (
    <Provider value={{ favoriteCategories: categories, clearAll, toggleCategory }}>
      {children}
    </Provider>
  );
};

export default FavoriteCategoriesContext;
export { FavoriteCategoriesProvider, Consumer as FavoriteCategoriesConsumer };
