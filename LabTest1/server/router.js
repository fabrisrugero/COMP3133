const chatModel = require("./chat");
const express = require("express");
const router = express.Router();

// const ORIGIN = 'https://project-chat-application.herokuapp.com/';
const ORIGIN = "http://localhost:3000";

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", ORIGIN);
  res.send("server is up and running");
});

router.get("/chats/rooms/:room", async (req, res) => {
  const chats = await chatModel.find({room : req.params.room});
  res.setHeader("Access-Control-Allow-Origin", ORIGIN);
  try {
    res.send(chats);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
