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
  username: {
    trim: true,
    type: String,
    lowercase: true,
    required: [true, "Please enter username"],
  },
});
// Returns a date in 'yyyy-MM-dd' format
BookingSchema.methods.formatDate = function (dateProperty) {
  const newDate = new Date(this[dateProperty]);
  let formattedDate = `${newDate.getFullYear()}-`;
  formattedDate += `${`0${newDate.getMonth() + 1}`.slice(-2)}-`; // for double digit month
  formattedDate += `${`0${newDate.getDate()}`.slice(-2)}`; // for double digit day
  return formattedDate;
};
const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
