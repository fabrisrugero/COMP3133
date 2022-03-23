const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  listing_id: {
    trim: true,
    type: String,
    lowercase: true,
    alias: "listingId",
    required: [true, "Please enter a listing ID"],
  },
  listing_title: {
    trim: true,
    alias: "name",
    type: String,
    lowercase: true,
    required: [true, "Please enter a listing title"],
  },
  description: {
    trim: true,
    type: String,
    uppercase: true,
    required: [true, "Please enter a description"],
  },
  street: {
    trim: true,
    type: String,
    lowercase: true,
    required: [true, "Please enter a street name"],
  },
  city: {
    trim: true,
    type: String,
    lowercase: true,
    required: [true, "Please enter a description"],
  },
  postal_code: {
    trim: true,
    type: String,
    lowercase: true,
    alias: "postalCode",
    required: [true, "Please enter a description"],
  },
  price: {
    type: Number,
    required: [true, "Please enter a description"],
    validate(value) {
      if (value < 0.0) throw new Error("Negative Prices aren't allowed.");
    },
  },
  email: {
    trim: true,
    type: String,
    uppercase: true,
    required: [true, "Please enter an email"],
    validate: {
      message: "please enter a valid email e.g abc@abc.abc",
      validator: (email) => /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email),
    },
  },
  username: {
    trim: true,
    type: String,
    lowercase: true,
    required: [true, "Please enter username"],
  },
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;
