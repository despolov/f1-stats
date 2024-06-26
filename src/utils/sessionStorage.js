const setSessionStorageValue = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const getSessionStorageValue = (key) => {
  const value = sessionStorage.getItem(key);

  return JSON.parse(value);
};

export { setSessionStorageValue, getSessionStorageValue };
