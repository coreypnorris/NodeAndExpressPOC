const express = require("express");
const debug = require("debug")("app:sessionRouter");
const { MongoClient, ObjectId } = require("mongodb");
const sessionsRouter = express.Router();

sessionsRouter.route("/").get((req, res) => {
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(process.env.DB_CONNECTION_STRING);
      debug("Connected to the mongo DB");

      const db = client.db(process.env.DB_NAME);
      const sessions = await db.collection("sessions").find().toArray();
      res.render("sessions", { sessions });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

sessionsRouter.route("/:id").get((req, res) => {
  const id = req.params.id;
  (async function mongo() {
    let client;
    try {
      client = await MongoClient.connect(process.env.DB_CONNECTION_STRING);
      debug("Connected to the mongo DB");

      const db = client.db(process.env.DB_NAME);
      const session = await db
        .collection("sessions")
        .findOne({ _id: new ObjectId(id) });

      res.render("session", { session });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = sessionsRouter;
