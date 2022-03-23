import { gql } from 'apollo-angular';
import { Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Booking = {
  __typename?: 'Booking';
  booking_date: Scalars['String'];
  booking_end: Scalars['String'];
  booking_id: Scalars['String'];
  booking_start: Scalars['String'];
  listing_id: Scalars['String'];
  username: Scalars['String'];
};

export type BookingInput = {
  booking_date: Scalars['String'];
  booking_end: Scalars['String'];
  booking_id: Scalars['String'];
  booking_start: Scalars['String'];
  listing_id: Scalars['String'];
};

export enum CacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export type Listing = {
  __typename?: 'Listing';
  city: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  listingId: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
  price: Scalars['Float'];
  street: Scalars['String'];
  username: Scalars['String'];
};

export type ListingInput = {
  city: Scalars['String'];
  description: Scalars['String'];
  email: Scalars['String'];
  listingId: Scalars['String'];
  name: Scalars['String'];
  postalCode: Scalars['String'];
  price: Scalars['Float'];
  street: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBooking: Booking;
  createListing: Listing;
  deleteBooking: Scalars['String'];
  deleteListing: Scalars['String'];
  register: User;
};


export type MutationCreateBookingArgs = {
  bookingInput: BookingInput;
};


export type MutationCreateListingArgs = {
  listingInput: ListingInput;
};


export type MutationDeleteBookingArgs = {
  bookingId: Scalars['String'];
};


export type MutationDeleteListingArgs = {
  listingId: Scalars['String'];
};


export type MutationRegisterArgs = {
  userInput: UserInput;
};

export type Query = {
  __typename?: 'Query';
  getBookings?: Maybe<Array<Maybe<Booking>>>;
  getListings?: Maybe<Array<Maybe<Listing>>>;
  getListingsByName?: Maybe<Array<Maybe<Listing>>>;
  getListingsByPostalCodeOrCity?: Maybe<Array<Maybe<Listing>>>;
  getMyBookings?: Maybe<Array<Maybe<Booking>>>;
  getMyListings?: Maybe<Array<Maybe<Listing>>>;
  login: User;
};


export type QueryGetListingsByNameArgs = {
  name: Scalars['String'];
};


export type QueryGetListingsByPostalCodeOrCityArgs = {
  searchtext: Scalars['String'];
};


export type QueryLoginArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  token: Scalars['String'];
  type: Scalars['String'];
  username: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  type: Scalars['String'];
  username: Scalars['String'];
};

export type CreateUserMutationVariables = Exact<{
  data: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', register: { __typename?: 'User', type: string, email: string, token: string, username: string } };

export const CreateUserDocument = gql`
    mutation createUser($data: UserInput!) {
  register(userInput: $data) {
    type
    email
    token
    username
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateUserGQL extends Apollo.Mutation<CreateUserMutation, CreateUserMutationVariables> {
    document = CreateUserDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }