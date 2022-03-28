const express = require("express");
const debug = require("debug")("app:sessionRouter");
const { MongoClient, ObjectId } = require("mongodb");
const speakerService = require("../services/speakerService");
const sessionsRouter = express.Router();

sessionsRouter.use((req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("auth/signIn");
  }
});

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

      const speaker = await speakerService.getSpeakerById(1);
      session.speaker = speaker.data;
      res.render("session", { session });
    } catch (error) {
      debug(error.stack);
    }
    client.close();
  })();
});

module.exports = sessionsRouter;
