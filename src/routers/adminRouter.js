const express = require("express");
const debug = require("debug")("app:adminRouter");
const { MongoClient } = require("mongodb");
const sessions = require("../data/sessions.json");
const adminRouter = express.Router();

adminRouter.route("/").get((req, res) => {
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(process.env.DB_CONNECTION_STRING);
      debug("Connected to the mongo DB");

      const db = client.db(process.env.DB_NAME);
      const response = await db.collection("sessions").insertMany(sessions);
      res.json(response);
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = adminRouter;
