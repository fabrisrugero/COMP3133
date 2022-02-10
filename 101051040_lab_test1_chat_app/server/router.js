const privateChatModel = require("./models/PrivateChat");
const groupChatModel = require("./models/GroupChat");
const userModel = require("./models/ChatUser");
const express = require("express");
const router = express.Router();

const ORIGIN = "http://localhost:3000";
// const ORIGIN = "http://10.0.0.87:3000";

router.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", ORIGIN);
  res.send("server is up and running");
});

router.get("/publichat/rooms/:room", async (req, res) => {
  const chats = await groupChatModel
    .find({ room: req.params.room })
    .sort("date_sent");
  res.setHeader("Access-Control-Allow-Origin", ORIGIN);
  try {
    res.send(chats);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/privatechat/from/:fromuser/to/:touser", async (req, res) => {
  const chats = await privateChatModel
    .find({
      $or: [
        { from_user: req.params.fromuser, to_user: req.params.touser },
        { from_user: req.params.touser, to_user: req.params.fromuser },
      ],
    })
    .sort("date_sent");
  res.setHeader("Access-Control-Allow-Origin", ORIGIN);
  try {
    res.send(chats);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/chats/signup", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", ORIGIN);
  const existingUser = await userModel.findOne({
    username: req.query.username,
  });
  console.log(existingUser);
  if (!existingUser) {
    const newUserData = {
      username: req.query.username,
      password: req.query.password,
      firstname: req.query.firstname,
      lastname: req.query.lastname,
    };
    const newUser = new userModel(newUserData);
    try {
      await newUser.save((err) => {
        if (err) res.status(400).send(err);
        else res.status(201).send(newUser);
      });
    } catch (err) {
      res.status(500).send(err);
    }
  } else res.status(400).send("username is taken, or user already axists");
});

router.get("/chats/signin", async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", ORIGIN);
  try {
    const user = await userModel.findOne({
      username: req.query.username,
      password: req.query.password,
    });
    res
      .status(user ? 200 : 401)
      .send(user ? 'login succeeded' : "invalid username or password");
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
