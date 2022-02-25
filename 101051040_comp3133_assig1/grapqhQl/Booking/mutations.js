const Booking = require("../../models/Booking");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Mutation: {
    async createBooking(_, { bookingInput }, context) {
      const user = checkAuth(context);
      if (user.type === "admin") throw Error("403 Forbidden");
      const newBooking = new Booking({
        ...bookingInput,
        username: user.username,
      });
      const savedbooking = await newBooking.save();
      savedbooking.booking_end = savedbooking.formatDate("booking_end");
      savedbooking.booking_date = savedbooking.formatDate("booking_date");
      savedbooking.booking_start = savedbooking.formatDate("booking_start");
      return savedbooking;
    },
    async deleteBooking(_, { bookingId }, context) {
      const user = checkAuth(context);
      try {
        const booking = await Booking.findById(bookingId);
        if (user.username === booking.username) {
          await booking.delete();
          return "Booking deleted successfully";
        } else throw new Error("403 Forbidden");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
