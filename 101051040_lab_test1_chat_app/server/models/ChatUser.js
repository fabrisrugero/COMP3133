const mongoose = require("mongoose");

const ChatUserSchema = new mongoose.Schema({
  username: {
    trim: true,
    type: String,
    required: true,
    lowercase: true,
  },
  firstname: {
    trim: true,
    type: String,
    required: true,
    lowercase: true,
  },
  lastname: {
    trim: true,
    type: String,
    required: true,
    lowercase: true,
  },
  createdon: {
    type: Date,
    default: Date.now,
  },
});

const ChatUser = mongoose.model("ChatUser", ChatUserSchema);
module.exports = ChatUser;