const Listing = require("../../models/Listing");
const checkAuth = require("../../util/check-auth");

module.exports = {
  Query: {
    async getListings() {
      let listings = [];
      try {
        listings = await Listing.find({}).exec();
      } catch (err) {
        throw new Error(err);
      }
      return listings;
    },
    async getMyListings(_, __, context) {
      const user = checkAuth(context);
      if (user.type === "customer") throw Error("403 Forbidden");
      try {
        return await Listing.find({ username: user.username }).exec();
      } catch (err) {
        throw new Error(err);
      }
    },
    async getListingsByName(_, { name }) {
      try {
        return await Listing.find({
          listing_title: { $regex: name },
        }).exec();
      } catch (err) {
        throw new Error(err);
      }
    },
    async getListingsByPostalCodeOrCity(_, { searchtext }) {
      try {
        return await Listing.find()
          .or([{ city: searchtext }, { postal_code: searchtext }])
          .exec();
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};
