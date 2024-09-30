const { v4: uuidv4 } = require("uuid");
const validate = require("validate.js");
const constraints = require("../lib/constraints");
const bcrypt = require("bcrypt");
const DB = require("../lib/db");

const _ = class User {
  constructor() {
    this.created = new Date();
    this.id = uuidv4();
    this.name = {
      first: null,
      last: null,
    };
    this.email = null;
    this.security = {
      passwordHash: null,
    };
    this.banned = false;
  }

  save() {
    DB.write({ data: "Hello World" });
  }

  find(id) {
    return "";
  }

  setFirstName(firstName) {
    try {
      if (firstName) {
        firstName = firstName.trim().replace(/ +/g, " ");
      }

      const msg = validate.single(firstName, constraints.name);

      if (msg) {
        return msg;
      } else {
        this.name.first = firstName;
        return;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  setLastName(lastName) {
    try {
      if (lastName) {
        lastName = lastName.trim().replace(/ +/g, " ");
      }

      const msg = validate.single(lastName, constraints.name);

      if (msg) {
        return msg;
      } else {
        this.name.last = lastName;
        return;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  setEmail(email) {
    try {
      const msg = validate.single(email, constraints.email);
      if (msg) {
        return msg;
      } else {
        this.email = email;
        return;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async setPassword(password) {
    try {
      const msg = validate.single(password, constraints.password);
      if (msg) {
        return msg;
      } else {
        this.security.passwordHash = await bcrypt.hash(password, 10);
        return;
      }
    } catch (e) {
      throw new Error(e);
    }
  }
};

module.exports = _;
