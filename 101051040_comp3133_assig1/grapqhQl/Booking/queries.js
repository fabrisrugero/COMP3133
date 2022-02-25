const Booking = require("../../models/Booking");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getBookings() {
      try {
        const bookings = await Booking.find({});
        const formattedBookings = bookings.map((booking) => ({
          ...booking._doc,
          booking_end: booking.formatDate("booking_end"),
          booking_date: booking.formatDate("booking_date"),
          booking_start: booking.formatDate("booking_start"),
        }));
        return formattedBookings;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getMyBookings(_, __, context) {
      const user = checkAuth(context);
      if (user.type === "admin") throw Error("403 Forbidden");
      try {
        const bookings = await Booking.find({ username: user.username });
        const formattedBookings = bookings.map((booking) => ({
          ...booking._doc,
          booking_end: booking.formatDate("booking_end"),
          booking_date: booking.formatDate("booking_date"),
          booking_start: booking.formatDate("booking_start"),
        }));
        console.log(formattedBookings, bookings);
        return formattedBookings;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
