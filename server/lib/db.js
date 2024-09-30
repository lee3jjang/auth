const _ = class DB {
  static localStorage = [];
  static write(data) {
    if (data) {
      this.localStorage.push(data);
      return data;
    }
    return false;
  }
  static findOne(id) {
    if (id) {
      for (const record of this.localStorage) {
        if (record.id === id) {
          return record;
        }
      }
    }
    return false;
  }
  static findByEmail(email) {
    if (email) {
      for (const record of this.localStorage) {
        if (record.email === email) {
          return record;
        }
      }
    }
    return false;
  }
};

module.exports = _;
