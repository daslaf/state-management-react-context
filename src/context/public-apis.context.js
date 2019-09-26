import React, { createContext, useCallback, useState } from 'react';

import { getEntries } from '../services/public-apis.service';

const PublicAPIsContext = createContext();
const { Provider, Consumer } = PublicAPIsContext;

const INITIAL_STATE = {
  error: null,
  isLoaded: false,
  items: [],
};

const PublicAPIsProvider = ({ children }) => {
  const [data, setData] = useState({});

  const getAPIsByCategory = useCallback(
    ({ id, name }) => {
      if (data[id] && data[id].isLoaded && !data[id].error) {
        // This request has already been performed succesfully so don't do anything
        return;
      }

      // else, it failed or it hadn't been performed, either way, reset state for that `id`
      setData(previous => ({ ...previous, [id]: INITIAL_STATE }));

      // TODO: Implement Abort Token?
      getEntries(name).then(
        ({ entries }) => {
          setData(previous => ({
            ...previous,
            [id]: {
              error: false,
              isLoaded: true,
              items: entries,
            },
          }));
        },
        error => {
          setData(previous => ({ ...previous, [id]: { ...INITIAL_STATE, error, isLoaded: true } }));
        }
      );
    },
    [data]
  );

  return <Provider value={{ data, getAPIsByCategory }}>{children}</Provider>;
};

export default PublicAPIsContext;
export { PublicAPIsProvider, Consumer as PublicAPIsConsumer };
