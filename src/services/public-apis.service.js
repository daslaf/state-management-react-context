const BASE_URL = 'https://api.publicapis.org/';

const getCategories = () => {
  return new Promise((resolve, reject) => {
    const handler = setTimeout(() => {
      clearTimeout(handler);

      fetch(`${BASE_URL}categories`).then(res => resolve(res.json()), reject);
      // }, 5000);
    }, 1000);
  });
};

const getEntries = category => {
  const url = category
    ? `${BASE_URL}entries?category=${encodeURIComponent(category)}`
    : `${BASE_URL}entries`;

  return fetch(url).then(res => res.json());
};

export { getCategories, getEntries };
