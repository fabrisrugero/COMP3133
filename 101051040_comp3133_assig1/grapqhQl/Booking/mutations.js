const Booking = require("../../models/Booking");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Mutation: {
    async createBooking(_, { bookingInput }, context) {
      const user = checkAuth(context);
      const newBooking = new Booking({
        ...bookingInput,
        username: user.username,
      });
      return await newBooking.save();
    },
    async deleteBooking(_, { bookingId }, context) {
      const user = checkAuth(context);
      try {
        const booking = await Booking.findById(bookingId);
        if (user.username === booking.username) {
          await booking.delete();
          return "Booking deleted successfully";
        } else throw new Error("Action not allowed");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
