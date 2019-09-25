import React, { createContext, useEffect, useState } from 'react';
import { getCategories } from '../services/public-apis.service';
import { slugify } from '../utils';

const CategoriesContext = createContext();
const { Provider, Consumer } = CategoriesContext;

const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(res => {
      const _categories = res.map(name => ({ name, id: slugify(name).toLowerCase() }))

      setCategories(_categories);
    });
  }, []);

  return (
    <Provider value={categories}>{children}</Provider>
  );
}

export default CategoriesContext;
export { CategoriesProvider, Consumer as CategoriesConsumer  };