const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    trim: true,
    minlength: 4,
    required: true,
    index: true,
    unique: [true, "Duplicate Username Not allowed"],
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: function (value) {
      var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      return emailRegex.test(value);
    },
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    suite: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      validate: function (value) {
        var cityRegex = /^[a-zA-Z ]*$/;
        return cityRegex.test(value);
      },
    },
    zipcode: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate: function (value) {
        var zipcodeRegex = /^\d{5}-\d{4}?$/;
        return zipcodeRegex.test(value);
      },
    },
    geo: {
      lat: {
        type: Number,
        required: true,
        trim: true,
      },
      lng: {
        type: Number,
        required: true,
        trim: true,
      },
    },
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: function (value) {
      var phoneRegex = /^\d-\d{3}-\d{3}-\d{4}?$/;
      return phoneRegex.test(value);
    },
  },
  website: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: function (value) {
      var urlRegex = /^(http|https):\/\/[^ "]+$/;
      return urlRegex.test(value);
    },
  },
  company: {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    catchPhrase: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    bs: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
  },
});

const user = mongoose.model("user", userSchema);
module.exports = user;
