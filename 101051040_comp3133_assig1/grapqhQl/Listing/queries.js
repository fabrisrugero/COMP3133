const Listing = require("../../models/Listing");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getListings() {
      try {
        return await Listing.find({});
      } catch (err) {
        throw new Error(err);
      }
    },
    async getMyListings(_, __, context) {
      const user = checkAuth(context);
      if (user.type === "customer") throw Error("403 Forbidden");
      try {
        return await Listing.find({ username: user.username });
      } catch (err) {
        throw new Error(err);
      }
    },
    async getListingsByName(_, { Name }) {
      try {
        return await Listing.find({ Name });
      } catch (err) {
        throw new Error(err);
      }
    },
    async getListingsByPostalCodeOrCity(_, { PostalCodeOrCity }) {
      try {
        return await Listing.find().or([
          { city: PostalCodeOrCity },
          { postalCode: PostalCodeOrCity },
        ]);
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
