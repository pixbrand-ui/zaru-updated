export default class GLocalStorage {
  static Add(itemName, itemValue) {
    try {
      localStorage.setItem(itemName, JSON.stringify(itemValue));
    } catch (error) {
      console.log(error);
    }
  }
  static Update(itemName, itemValue) {
    try {
      localStorage.setItem(itemName, JSON.stringify(itemValue));
    } catch (error) {
      console.log(error);
    }
  }
  static Get(itemName) {
    try {
      return localStorage.getItem(itemName);
    } catch (error) {
      console.log(error);
    }
  }
  static GetJ(itemName) {
    try {
      let c = localStorage.getItem(itemName);
      return JSON.parse(c);
    } catch (error) {
      console.log(error);
    }
  }
  static Remove(itemName) {
    try {
      if (this.IsExists(itemName)) localStorage.removeItem(itemName);
    } catch (error) {
      console.log(error);
    }
  }
  static IsExists(itemName) {
    let res = false;
    try {
      let item = localStorage.getItem(itemName);
      if (item != null) res = true;
      return res;
    } catch (error) {
      console.log(error);
    }
    return res;
  }
}
