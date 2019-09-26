const BASE_URL = 'https://api.publicapis.org/';

const randomNumber = (x, y) => Math.round(Math.random() * y + x);

const getCategories = () => {
  return new Promise((resolve, reject) => {
    const handler = setTimeout(() => {
      clearTimeout(handler);

      fetch(`${BASE_URL}categories`).then(res => resolve(res.json()), reject);
    }, 5000);
  });
};

const getEntries = category => {
  return new Promise((resolve, reject) => {
    const handler = setTimeout(() => {
      clearTimeout(handler);

      const url = category
        ? `${BASE_URL}entries?category=${encodeURIComponent(category)}`
        : `${BASE_URL}entries`;

      fetch(url).then(res => resolve(res.json()), reject);
    }, randomNumber(1500, 3000));
  });
};

export { getCategories, getEntries };
