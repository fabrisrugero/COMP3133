const Listing = require("../../models/Listing");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Mutation: {
    async createListing(_, { listingInput }, context) {
      const user = checkAuth(context);
      if (user.type === "customer") throw Error("403 Forbidden");
      const newListing = new Listing({
        ...listingInput,
        username: user.username,
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
        } else throw new Error("403 Forbidden");
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
