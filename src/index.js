import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import { CategoriesProvider } from './context/categories.context';
import { FavoriteCategoriesProvider } from './context/favorite-categories.context';

const Root = () => (
  <FavoriteCategoriesProvider>
    <CategoriesProvider>
      <App />
    </CategoriesProvider>
  </FavoriteCategoriesProvider>
)


ReactDOM.render(
  <Root />,
  document.getElementById('root'));

