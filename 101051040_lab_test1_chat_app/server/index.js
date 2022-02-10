const cors = require("cors");
const http = require("http");
const express = require("express");
const router = require("./router");
const mongoose = require("mongoose");
const socketio = require("socket.io");
const groupChatModel = require("./models/GroupChat");
const privateChatModel = require("./models/PrivateChat");
const { addUser, removeUser, getUser } = require("./users");
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
    socket.emit("servermessage", {
      from_user: "admin",
      message: `${user.name}, welcome to room ${user.room}.`,
    });
    socket.broadcast
      .to(user.room)
      .emit("servermessage", {
        from_user: "admin",
        message: `${user.name} has joined!`,
      });
    callback();
  });

  socket.on("sendPublicMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "servermessage",
      saveChat({
        message: { room: user.room, from_user: user.name, message },
        groupChat: true,
      })
    );
    callback();
  });

  socket.on("sendPrivateMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit(
      "servermessage",
      saveChat({
        message: { to_user: user.room, from_user: user.name, message },
        groupChat: false,
      })
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("servermessage", {
        from_user: "Admin",
        message: `${user.name} has left.`,
      });
    }
  });
});

server.listen(process.env.PORT || 5001, () =>
  console.log(`Server has started.`)
);

const saveChat = ({ message, groupChat }) => {
  const chatMessage = groupChat
    ? new groupChatModel(message)
    : new privateChatModel(message);
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
