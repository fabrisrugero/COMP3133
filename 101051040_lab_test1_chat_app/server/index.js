const cors = require("cors");
const http = require("http");
const express = require("express");
const router = require("./router");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const groupChatModel = require("./models/GroupChat");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const app = express();
const server = http.createServer(app);
const io = socketio(
  server,
  (options = {
    cors: true,
    origins: ["http://localhost:3000", "http://10.0.0.87:3000"],
  })
);
mongoose.connect(
  "mongodb+srv://RFabris:chesss@cluster0.vpwwg.mongodb.net/ChatDB?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`,
    });

    socket.broadcast
      .to(user.room)
      .emit("message", { user: "admin", text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit(
      "message",
      saveGroupChat({ room: user.room, from_user: user.name, message })
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(process.env.PORT || 5001, () =>
  console.log(`Server has started.`)
);

const saveGroupChat = (message) => {
  const chatMessage = new groupChatModel(message);
  try {
    chatMessage.save((err) => {
      if (err) {
        console.log(err.errors);
      } else {
        console.log("message saved to DB");
      }
    });
  } catch (err) {
    if (err) {
      console.log(err);
    } else {
      console.log("message saved to DB");
    }
  }
  return message;
};
