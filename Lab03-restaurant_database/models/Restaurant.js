const mongoose = require('mongoose');
const Address = require('./address').schema;

const RestaurantSchema = new mongoose.Schema({
  address: Address,
  city: {
    type: String
  },
  cuisine: {
    type: String
  },
  name: {
    type: String
  },
  restaurant_id:{
    type: Number
  },
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;