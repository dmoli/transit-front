const localStorageMock = (function localStorageMock() {
  let store = {
    token: 'tokenValue',
  };

  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    },
    removeItem() {},
  };
}());

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
