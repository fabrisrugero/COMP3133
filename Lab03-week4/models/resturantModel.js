const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  address: {
    building: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    street: {
      type: String,
      trim: true,
      lowercase: true,
    },
    zipcode: {
        type: String,
        trim: true,
        lowercase: true,
      },
  },
  city: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  cuisine: {
    type: String,
    trim: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  restaurant_id: {
    type: String,
    trim: true,
    lowercase: true,
  },
});

const Restaurant = mongoose.model("Employee", RestaurantSchema);
module.exports = Restaurant;
