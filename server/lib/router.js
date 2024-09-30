const { Router } = require("express");
const User = require("../models/user");
const passport = require("passport");

const _ = Router();

_.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = new User();
    user.setFirstName(firstName);
    user.setLastName(lastName);
    user.setEmail(email);
    user.setPassword(password);
    user.save();

    res.status(200).json(user);
  } catch (e) {
    throw new Error(e);
  }
});

_.post("/login", async (req, res, next) => {
  console.log(`Login header ${JSON.stringify(req.body)}`);
  passport.authenticate("local", (err, user) => {
    console.log("user", user);
    if (err) {
      //
    }
    if (!user) {
      //
    }

    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({ redirectTo: "/profile" });
    });
  })(req, res, next);
  //   try {
  //     res.status(200).send({
  //       timestamp: Date.now(),
  //       msg: "Logged in successfully",
  //       code: 200,
  //     });
  //   } catch (e) {
  //     throw new Error(e);
  //   }
});

_.post("/logout", async (req, res) => {
  try {
    res.status(200).send({
      timestamp: Date.now(),
      msg: "Logged out successfully",
      code: 200,
    });
  } catch (e) {
    throw new Error(e);
  }
});

_.all("*", async (req, res) => {
  try {
    res.status(404).json({
      timestamp: Date.now(),
      msg: "no route matches your request",
      code: 404,
    });
  } catch (e) {
    throw new Error(e);
  }
});

module.exports = _;
