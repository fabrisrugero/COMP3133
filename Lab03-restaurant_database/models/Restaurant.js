const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  address: {
    building: {
      type: Number,
    },
    street: {
      type: String,
    },
    zipcode: {
      type: Number,
    },
  },
  city: {
    type: String,
  },
  cuisine: {
    type: String,
  },
  name: {
    type: String,
  },
  restaurant_id: {
    type: Number,
  },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;
