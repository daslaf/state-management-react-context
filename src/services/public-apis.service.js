const BASE_URL = 'https://api.publicapis.org/';

const getCategories = () => fetch(`${BASE_URL}categories`).then(res => res.json());

const getEntries = category => {
  const url = category
    ? `${BASE_URL}entries?category=${encodeURIComponent(category)}`
    : `${BASE_URL}entries`;

  return fetch(url).then(res => res.json());
}

export {
  getCategories,
  getEntries,
};
