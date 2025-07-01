const setInCache = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const getFromCache = (key) => {
  const value = sessionStorage.getItem(key);

  return JSON.parse(value);
};

const removeFromCache = (key) => {
  sessionStorage.removeItem(key);
};

export { setInCache, getFromCache, removeFromCache };
