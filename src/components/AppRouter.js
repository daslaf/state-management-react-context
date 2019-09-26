import React from 'react';
import { Route } from 'react-router-dom';

import APIsView from './APIsView';
import Categories from './Categories';

const AppRouter = () => {
  return (
    <main className="ui-container">
      <Route exact path="/" component={APIsView} />
      <Route exact path="/categories" component={Categories} />
    </main>
  );
};

export default AppRouter;
