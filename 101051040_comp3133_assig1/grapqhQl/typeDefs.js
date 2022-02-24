const { gql } = require('apollo-server-express');

module.exports = gql`
  type Listing {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Booking {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getListings: [Listing]
    getListing(postId: ID!): Listing
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createListing(body: String!): Listing!
    deleteListing(postId: ID!): String!
    createBooking(postId: String!, body: String!): Listing!
    deleteBooking(postId: ID!, commentId: ID!): Listing!
    likeListing(postId: ID!): Listing!
  }
`;