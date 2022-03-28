const debug = require("debug")("app:localStrategy");
const passport = require("passport");
const { Strategy } = require("passport-local");
const { MongoClient, ObjectId } = require("mongodb");

module.exports = function localStrategy() {
  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        (async function validateUser() {
          let client;
          try {
            client = await MongoClient.connect(
              process.env.DB_CONNECTION_STRING
            );
            debug("Connected to the mongo DB");
            const db = client.db(process.env.DB_NAME);
            const user = await db.collection("users").findOne({ username });
            if (user && user.password === password) {
              done(null, user);
            } else {
              done(null, false);
            }
          } catch (error) {
            done(error, false);
          }
          client.close();
        })();
      }
    )
  );
};
