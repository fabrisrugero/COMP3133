const mongoose = require("mongoose");

const PrivateChatSchema = new mongoose.Schema({
  from_user: {
    trim: true,
    type: String,
    required: true,
    lowercase: true,
  },
  to_user: {
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

const PrivateChat = mongoose.model("PrivateChat", PrivateChatSchema);
module.exports = PrivateChat;
