const Booking = require("../../models/Booking");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getBookings() {
      try {
        return await Booking.find({});
      } catch (err) {
        throw new Error(err);
      }
    },
    async getMyBookings(_, __, context) {
      const user = checkAuth(context);
      if (user.type === "admin") throw Error("403 Forbidden");
      try {
        return await Booking.find({ username: user.username });
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
