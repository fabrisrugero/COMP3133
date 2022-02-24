const Listing = require("../../models/Listing");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getListings() {
      try {
        return await Listing.find().sort({ createdAt: -1 });
      } catch (err) {
        throw new Error(err);
      }
    },
    async getMyListing(_, context) {
      const user = checkAuth(context);
      try {
        return await Listing.findById(user.username);
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
        return await Listing.findById(PostalCodeOrCity);
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
