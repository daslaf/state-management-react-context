import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import AppNavigation from './components/AppNavigation';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <Router>
      <AppNavigation />
      <AppRouter />
    </Router>
  );
}

export default App;
