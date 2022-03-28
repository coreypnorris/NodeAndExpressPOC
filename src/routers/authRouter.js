const express = require("express");
const debug = require("debug")("app:authRouter");
const passport = require("passport");
const { MongoClient, ObjectId } = require("mongodb");
const authRouter = express.Router();

authRouter.route("/signUp").post((req, res) => {
  const { username, password } = req.body;

  (async function addUser() {
    let client;
    try {
      client = await MongoClient.connect(process.env.DB_CONNECTION_STRING);
      debug("Connected to the mongo DB");
      const db = client.db(process.env.DB_NAME);
      const user = { username, password };
      const results = await db.collection("users").insertOne(user);
      debug(results);
      user._id = results.insertedId;
      req.login(user, () => {
        res.redirect("/auth/profile");
      });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

authRouter
  .route("/signIn")
  .get((req, res) => {
    res.render("signin");
  })
  .post(
    passport.authenticate("local", {
      successRedirect: "/auth/profile",
      failureMessage: "/",
    })
  );

authRouter.route("/profile").get((req, res) => {
  res.json(req.user);
});

module.exports = authRouter;
