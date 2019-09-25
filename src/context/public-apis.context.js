import React, { createContext, useEffect, useState } from 'react';

import { getEntries } from '../services/public-apis.service';

const PublicAPIsContext = createContext();
const { Provider, Consumer } = PublicAPIsContext;

const PublicAPIsProvider = ({ children }) => {
  const [apis, setApis] = useState([]);

  return (
    <Provider value={'hey'}>{children}</Provider>
  );
}

export default PublicAPIsContext;
export { PublicAPIsProvider, Consumer as PublicAPIsConsumer  };