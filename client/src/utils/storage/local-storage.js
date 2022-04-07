class LocalStorage {
  static getItem(item) {
    return window.localStorage.getItem(item);
  }

  static setItem(item, value) {
    window.localStorage.setItem(item, value);
  }

  static removeItem(item) {
    window.localStorage.removeItem(item);
  }
}

module.exports = LocalStorage;
