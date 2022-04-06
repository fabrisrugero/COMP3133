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
    listing_id: String!
    booking_id: String!
    booking_end: String!
    booking_date: String!
    booking_start: String!
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
    listing_id: String!
    booking_id: String!
    booking_end: String!
    booking_date: String!
    booking_start: String!
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
    getListings: [Listing!]!
    getBookings: [Booking!]!
    getMyListings: [Listing!]!
    getMyBookings: [Booking!]!
    getAvailableListings: [Listing!]!
    getListingsByName(name: String!): [Listing!]!
    login(username: String!, password: String!): User!
    getListingsByPostalCodeOrCity(searchtext: String!): [Listing!]!
  }

  type Mutation {
    register(userInput: UserInput!): User!
    deleteListing(listingId: String!): String!
    deleteBooking(bookingId: String!): String!
    createListing(listingInput: ListingInput!): Listing!
    createBooking(bookingInput: BookingInput!): Booking!
  }
`;
