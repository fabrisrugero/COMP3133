const mongoose = require("mongoose");

const GroupChatSchema = new mongoose.Schema({
  from_user: {
    trim: true,
    type: String,
    required: true,
    lowercase: true,
  },
  room: {
    trim: true,
    type: String,
    required: true,
    lowercase: true,
  },
  message: {
    trim: true,
    type: String,
    required: true,
    lowercase: true,
    maxlength: 300,
  },
  date_sent: {
    type: Date,
    default: Date.now,
  },
});

const GroupChat = mongoose.model("GroupChat", GroupChatSchema);
module.exports = GroupChat;