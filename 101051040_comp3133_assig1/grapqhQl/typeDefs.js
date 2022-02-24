const { gql } = require("apollo-server-express");

module.exports = gql`
  type Listing {
    name: String!
    city: String!
    price: Float!
    email: String!
    street: String!
    username: String!
    listingId: String!
    postalCode: String!
    description: String!
  }

  type User {
    type: String!
    email: String!
    token: String!
    username: String!
  }

  type Booking {
    username: String!
    listingId: String!
    bookingId: String!
    bookingEnd: String!
    bookingDate: String!
    bookingStart: String!
  }

  input UserInput {
    type: String!
    email: String!
    password: String!
    username: String!
    lastname: String!
    firstname: String!
  }

  input BookingInput {
    listingId: String!
    bookingId: String!
    bookingDate: String!
    bookingStart: String!
  }

  input ListingInput {
    name: String!
    city: String!
    price: Float!
    email: String!
    street: String!
    listingId: String!
    postalCode: String!
    description: String!
  }

  type Query {
    getListings: [Listing]
    getBookings: [Booking]
    getMyListings: [Listing]
    getMyBookings: [Booking]
    getListingsByName(name: String!): [Listing]
    login(username: String!, password: String!): User!
    getListingsByPostalCodeOrCity(PostalCodeOrCity: String!): [Listing]
  }

  type Mutation {
    register(userInput: UserInput!): User!
    deleteListing(listingId: String!): String!
    deleteBooking(bookingId: String!): String!
    createListing(listingInput: ListingInput!): Listing!
    createBooking(bookingInput: BookingInput!): Booking!
  }
`;
