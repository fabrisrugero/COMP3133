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
  register: Scalars['Boolean'];
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
  getAvailableListings: Array<Listing>;
  getBookings: Array<Booking>;
  getListings: Array<Listing>;
  getListingsByName: Array<Listing>;
  getListingsByPostalCodeOrCity: Array<Listing>;
  getMyBookings: Array<Booking>;
  getMyListings: Array<Listing>;
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


export type CreateUserMutation = { __typename?: 'Mutation', register: boolean };

export type GetAvailableListingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAvailableListingsQuery = { __typename?: 'Query', getAvailableListings: Array<{ __typename?: 'Listing', name: string, city: string, price: number, email: string, street: string, username: string, listingId: string, postalCode: string, description: string }> };

export type CreateBookingMutationVariables = Exact<{
  data: BookingInput;
}>;


export type CreateBookingMutation = { __typename?: 'Mutation', createBooking: { __typename?: 'Booking', username: string, listing_id: string, booking_id: string, booking_end: string, booking_date: string, booking_start: string } };

export type GetBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookingsQuery = { __typename?: 'Query', getBookings: Array<{ __typename?: 'Booking', username: string, listing_id: string, booking_id: string, booking_end: string, booking_date: string, booking_start: string }> };

export type GetListingsByPostalCodeOrCityQueryVariables = Exact<{
  searchtext: Scalars['String'];
}>;


export type GetListingsByPostalCodeOrCityQuery = { __typename?: 'Query', getListingsByPostalCodeOrCity: Array<{ __typename?: 'Listing', name: string, city: string, price: number, email: string, street: string, username: string, listingId: string, postalCode: string, description: string }> };

export type GetListingsByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type GetListingsByNameQuery = { __typename?: 'Query', getListingsByName: Array<{ __typename?: 'Listing', name: string, city: string, price: number, email: string, street: string, username: string, listingId: string, postalCode: string, description: string }> };

export type ListingsQueryVariables = Exact<{ [key: string]: never; }>;


export type ListingsQuery = { __typename?: 'Query', getListings: Array<{ __typename?: 'Listing', name: string, city: string, price: number, email: string, street: string, username: string, listingId: string, postalCode: string, description: string }> };

export type GetMyBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyBookingsQuery = { __typename?: 'Query', getMyBookings: Array<{ __typename?: 'Booking', username: string, listing_id: string, booking_id: string, booking_end: string, booking_date: string, booking_start: string }> };

export type CreateListingMutationVariables = Exact<{
  data: ListingInput;
}>;


export type CreateListingMutation = { __typename?: 'Mutation', createListing: { __typename?: 'Listing', name: string, city: string, price: number, email: string, street: string, username: string, listingId: string, postalCode: string, description: string } };

export type GetMyListingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyListingsQuery = { __typename?: 'Query', getMyListings: Array<{ __typename?: 'Listing', name: string, city: string, price: number, email: string, street: string, username: string, listingId: string, postalCode: string, description: string }> };

export const CreateUserDocument = gql`
    mutation createUser($data: UserInput!) {
  register(userInput: $data)
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
export const GetAvailableListingsDocument = gql`
    query getAvailableListings {
  getAvailableListings {
    name
    city
    price
    email
    street
    username
    listingId
    postalCode
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetAvailableListingsGQL extends Apollo.Query<GetAvailableListingsQuery, GetAvailableListingsQueryVariables> {
    document = GetAvailableListingsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateBookingDocument = gql`
    mutation createBooking($data: BookingInput!) {
  createBooking(bookingInput: $data) {
    username
    listing_id
    booking_id
    booking_end
    booking_date
    booking_start
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateBookingGQL extends Apollo.Mutation<CreateBookingMutation, CreateBookingMutationVariables> {
    document = CreateBookingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetBookingsDocument = gql`
    query getBookings {
  getBookings {
    username
    listing_id
    booking_id
    booking_end
    booking_date
    booking_start
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetBookingsGQL extends Apollo.Query<GetBookingsQuery, GetBookingsQueryVariables> {
    document = GetBookingsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetListingsByPostalCodeOrCityDocument = gql`
    query getListingsByPostalCodeOrCity($searchtext: String!) {
  getListingsByPostalCodeOrCity(searchtext: $searchtext) {
    name
    city
    price
    email
    street
    username
    listingId
    postalCode
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetListingsByPostalCodeOrCityGQL extends Apollo.Query<GetListingsByPostalCodeOrCityQuery, GetListingsByPostalCodeOrCityQueryVariables> {
    document = GetListingsByPostalCodeOrCityDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetListingsByNameDocument = gql`
    query getListingsByName($name: String!) {
  getListingsByName(name: $name) {
    name
    city
    price
    email
    street
    username
    listingId
    postalCode
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetListingsByNameGQL extends Apollo.Query<GetListingsByNameQuery, GetListingsByNameQueryVariables> {
    document = GetListingsByNameDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const ListingsDocument = gql`
    query listings {
  getListings {
    name
    city
    price
    email
    street
    username
    listingId
    postalCode
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class ListingsGQL extends Apollo.Query<ListingsQuery, ListingsQueryVariables> {
    document = ListingsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetMyBookingsDocument = gql`
    query getMyBookings {
  getMyBookings {
    username
    listing_id
    booking_id
    booking_end
    booking_date
    booking_start
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetMyBookingsGQL extends Apollo.Query<GetMyBookingsQuery, GetMyBookingsQueryVariables> {
    document = GetMyBookingsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const CreateListingDocument = gql`
    mutation createListing($data: ListingInput!) {
  createListing(listingInput: $data) {
    name
    city
    price
    email
    street
    username
    listingId
    postalCode
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class CreateListingGQL extends Apollo.Mutation<CreateListingMutation, CreateListingMutationVariables> {
    document = CreateListingDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }
export const GetMyListingsDocument = gql`
    query getMyListings {
  getMyListings {
    name
    city
    price
    email
    street
    username
    listingId
    postalCode
    description
  }
}
    `;

  @Injectable({
    providedIn: 'root'
  })
  export class GetMyListingsGQL extends Apollo.Query<GetMyListingsQuery, GetMyListingsQueryVariables> {
    document = GetMyListingsDocument;
    
    constructor(apollo: Apollo.Apollo) {
      super(apollo);
    }
  }