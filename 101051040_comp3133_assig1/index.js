const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./grapqhQl/resolvers");
const typeDefs = require("./grapqhQl/typeDefs");

//Store sensitive information to env variables
const dotenv = require("dotenv");
dotenv.config();

//mongoDB Atlas Connection String
const mongodb_atlas_url = process.env.MONGODB_URL;

//TODO - Replace you Connection String here
mongoose
  .connect(mongodb_atlas_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((success) => {
    console.log("Success Mongodb connection", success);
  })
  .catch((err) => {
    console.log("Error Mongodb connection", error);
  });

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
app.use("*", cors());
app.use(express.json());
server.applyMiddleware({ app });
app.listen({ port: process.env.PORT }, () =>
  console.log(`Started at localhost:${process.env.PORT}${server.graphqlPath}`)
);
