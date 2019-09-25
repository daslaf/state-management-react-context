import React from 'react';
import { Route } from 'react-router-dom';

import APIList from './APIList';
import Categories from './Categories';

const AppRouter = () => {
  return (
    <>
      <Route exact path='/' component={APIList} />
      <Route exact path='/categories' component={Categories} />
    </>
  )
}

export default AppRouter;