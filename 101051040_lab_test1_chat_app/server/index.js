const cors = require("cors");
const http = require("http");
const express = require("express");
const router = require("./router");
const chatModel = require("./chat");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const app = express();
const server = http.createServer(app);
const io = socketio(
  server,
  (options = {
    cors: true,
    origins: ["http://localhost:3000"],
  })
);
mongoose.connect(
  "mongodb+srv://RFabris:mC1q7m12D2PObVHC@cluster0.lw10r.mongodb.net/gbc_full_stack?retryWrites=true&w=majority",
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
      saveChat(user.room, { user: user.name, text: message }) // save chat to MongoAtlas
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

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);

const saveChat = (room, message) => {
  const chatMessage = new chatModel({ room, ...message });
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
