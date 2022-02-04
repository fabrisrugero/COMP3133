const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  building: {
    type: Number,
  },
  street: {
    type: String,
  },
  zipcode: {
    type: Number,
  },
});

const Address = mongoose.model("Address", AddressSchema);
module.exports = Address;
