const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    trim: true,
    index: true,
    unique: true,
    type: String,
    lowercase: true,
    required: [true, "Please enter username"],
  },
  firstname: {
    trim: true,
    type: String,
    lowercase: true,
    required: [true, "Please enter first name"],
  },
  lastname: {
    trim: true,
    type: String,
    lowercase: true,
    required: [true, "Please enter last name"],
  },
  password: {
    trim: true,
    type: String,
    minlength: 10,
    lowercase: true,
    required: [true, "Please enter password"],
    validate: {
      validator: (password) => /^[a-zA-Z0-9\#\$\&\_]{6,}$/.test(password),
      message: "atlest 6 characters, only alphabets, 0-9, #, $, &, _",
    },
  },
  email: {
    trim: true,
    type: String,
    uppercase: true,
    required: [true, "Please enter an email"],
    validate: {
      validator: (email) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email),
      message: "please enter a valid email e.g abc@abc.abc",
    },
  },

  type: {
    trim: true,
    type: String,
    lowercase: true,
    enum: ["admin", "customer"],
    required: [true, "Please enter a role"],
  },
  encryptedPassword: {
    trim: true,
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
