const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  listing_id: {
    trim: true,
    type: String,
    lowercase: true,
    alias: "listingId",
    required: [true, "Please enter listing ID"],
  },
  booking_id: {
    trim: true,
    type: String,
    lowercase: true,
    alias: "bookingId",
    required: [true, "Please enter booking ID"],
  },
  booking_date: {
    type: Date,
    default: Date.now,
    alias: 'bookingDate',
  },
  booking_start: {
    type: Date,
    alias: "bookingStart",
    required: [true, "Please enter start date"],
  },
  booking_end: {
    type: Date,
    alias: "bookingEnd",
    required: [true, "Please enter end date"],
  },
  username: {
    trim: true,
    type: String,
    lowercase: true,
    required: [true, "Please enter username"],
  },
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
