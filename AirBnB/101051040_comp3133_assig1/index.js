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
const dotenv = require("dotenv");

dotenv.config();
const mongodb_atlas_url = process.env.MONGODB_URL;
mongoose
  .connect(mongodb_atlas_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((success) => {
    console.log("Success Mongodb connection", success.STATES);
  })
  .catch((err) => {
    console.log("Error Mongodb connection", err);
  });
const app = express();
app.use(express.json());
app.post("/auth/login", async (req, res) => {
  console.log(req.body);
  let user = await userQueries.Query.login(null, req.body);
  res.send(user);
});
app.get("/auth", (req, res) => {
  res.send(true);
});
const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      ...userQueries.Query,
      ...listingQueries.Query,
      ...bookingQueries.Query,
    },
    Mutation: {
      ...userMutations.Mutation,
      ...listingMutations.Mutation,
      ...bookingMutations.Mutation,
    },
  },
  context: ({ req, res }) => ({ req, res }),
});
server.applyMiddleware({ app });
app.listen({ port: process.env.PORT }, () =>
  console.log(`Started at localhost:${process.env.PORT}${server.graphqlPath}`)
);
