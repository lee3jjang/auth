const express = require("express");
const cookieParser = require("cookie-parser");
const router = require("./lib/router");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cookieSession = require("cookie-session");

const app = express();

const port = process.env.PORT || 3000;

const _ = {};

_.start = () => {
  try {
    app.listen(port);
    console.log(`Express server listening on ${port}`);
  } catch (e) {
    throw new Error(e.message);
  }
};

app.use(
  cookieSession({
    name: "app-auth",
    keys: ["secret-new", "secret-old"],
    maxAge: 60 * 60 * 24,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  console.log("Serialize user:", user);
  return done(null, user.id);
});

passport.use(
  "local",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      console.log(`Local strategy verify cb`);
      return done(null, { id: "test" });
    }
  )
);

app.use("/api", router);

_.start();
