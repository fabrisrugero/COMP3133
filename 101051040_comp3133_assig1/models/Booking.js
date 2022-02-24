const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  listing_id: {
    trim: true,
    type: String,
    lowercase: true,
    required: [true, "Please enter listing ID"],
  },
  booking_id: {
    trim: true,
    type: String,
    lowercase: true,
    required: [true, "Please enter booking ID"],
  },
  booking_date: {
    type: Date,
    default: Date.now,
  },
  booking_start: {
    type: Date,
    required: [true, "Please enter start date"],
  },
  booking_end: {
    type: Date,
    required: [true, "Please enter end date"],
  },
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
