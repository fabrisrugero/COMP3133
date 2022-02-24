const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const listingQueries = require("./grapqhQl/Listing/queries");
const listingMutations = require("./grapqhQl/Listing/mutations");
const bookingMutations = require("./grapqhQl/Booking/mutations");
const bookingQueries = require("./grapqhQl/Booking/queries");
const userMutations = require("./grapqhQl/User/mutations");
const userQueries = require("./grapqhQl/User/queries");
const typeDefs = require("./grapqhQl/typeDefs");
const merge = require("lodash.merge");
const dotenv = require("dotenv");
dotenv.config();
const mongodb_atlas_url = process.env.MONGODB_URL;
mongoose
  .connect(mongodb_atlas_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((success) => {
    console.log("Success Mongodb connection", success);
  })
  .catch((err) => {
    console.log("Error Mongodb connection", err);
  });
// merge all resolvers into single object
const resolvers = merge(userMutations, [
  userQueries,
  listingQueries,
  bookingQueries,
  listingMutations,
  bookingMutations,
]);
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
app.use("*", cors());
app.use(express.json());
server.applyMiddleware({ app });
app.listen({ port: process.env.PORT }, () =>
  console.log(`Started at localhost:${process.env.PORT}${server.graphqlPath}`)
);
