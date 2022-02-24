const Booking = require("../../models/Booking");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Mutation: {
    async createBooking(_, { body }, context) {
      const user = checkAuth(context);
      if (body.trim() === "") throw new Error("Booking is empty");
      const newBooking = new Booking({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
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