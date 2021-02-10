const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  room: {
    trim: true,
    type: String,
    required: true,
    lowercase: true,
  },
  user: {
    trim: true,
    type: String,
    required: true,
    lowercase: true,
  },
  text: {
    trim: true,
    type: String,
    required: true,
    lowercase: true,
    maxlength: 300,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

const Employee = mongoose.model("Chat", ChatSchema);
module.exports = Employee;
