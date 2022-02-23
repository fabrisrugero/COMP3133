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
    console.log("Success Mongodb connection");
  })
  .catch((err) => {
    console.log("Error Mongodb connection");
  });

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
app.use(express.json());
app.use("*", cors());
server.applyMiddleware({ app });
app.listen({ port: process.env.PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`
  )
);
