const Booking = require("../../models/Booking");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getBookings() {
      try {
        return await Booking.find().sort({ createdAt: -1 });
      } catch (err) {
        throw new Error(err);
      }
    },
    async getMyBookings(_, context) {
      const user = checkAuth(context);
      try {
        return await Booking.findById(user.username);
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
