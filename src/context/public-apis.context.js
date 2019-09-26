import React, { createContext, useCallback, useMemo, useRef, useState } from 'react';

import { getEntries } from '../services/public-apis.service';

const PublicAPIsContext = createContext();
const { Provider, Consumer } = PublicAPIsContext;

const INITIAL_STATE = {
  error: null,
  isLoaded: false,
};

const PublicAPIsProvider = ({ children }) => {
  const requests = useRef({});
  const [data, setData] = useState([]);

  const getAPIsByCategory = useCallback(({ id, name }) => {
    if (requests.current[id] && requests.current[id].isLoaded && !requests.current[id].error) {
      // This request has already been performed succesfully so don't do anything
      return;
    }

    // else, it failed or it hadn't been performed, either way, reset state for that `id`
    requests.current = { ...requests.current, [id]: INITIAL_STATE };

    // implement cancel token
    getEntries(name).then(
      ({ entries }) => {
        requests.current = { ...requests.current, [id]: { ...INITIAL_STATE, isLoaded: true } };
        setData(previous => [...previous, ...entries]);
      },
      error => {
        requests.current = { ...requests.current, [id]: { error, isLoaded: true } };
      }
    );
  }, []);

  const contextBag = useMemo(() => ({ data, getAPIsByCategory, requests: requests.current }), [
    data,
    requests,
    getAPIsByCategory,
  ]);

  return <Provider value={contextBag}>{children}</Provider>;
};

export default PublicAPIsContext;
export { PublicAPIsProvider, Consumer as PublicAPIsConsumer };
