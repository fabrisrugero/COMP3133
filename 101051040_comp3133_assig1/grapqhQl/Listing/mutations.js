const Listing = require("../../models/Listing");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Mutation: {
    async createListing(_, { body }, context) {
      const user = checkAuth(context);
      if (body.trim() === "") throw new Error("Listing is empty");
      const newListing = new Listing({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });
      return await newListing.save();
    },
    async deleteListing(_, { listingId }, context) {
      const user = checkAuth(context);
      try {
        const listing = await Listing.findById(listingId);
        if (user.username === listing.username) {
          await listing.delete();
          return "Listing deleted successfully";
        } else throw new Error("Action not allowed");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
