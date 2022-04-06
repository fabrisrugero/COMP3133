import { Injectable } from '@angular/core';
import { Booking } from 'src/generated-types';
import { Listing } from 'src/generated-types';

@Injectable()
export class tableUtils {
  constructor() {}
  listingCols = [
    {
      columnDef: 'listingId',
      header: 'No.',
      cell: (element: Listing) => `${element.listingId}`,
    },
    {
      columnDef: 'name',
      header: 'Name',
      cell: (element: Listing) => `${element.name}`,
    },
    {
      columnDef: 'street',
      header: 'Street',
      cell: (element: Listing) => `${element.street}`,
    },
    {
      columnDef: 'postalCode',
      header: 'PostalCode',
      cell: (element: Listing) => `${element.postalCode}`,
    },
    {
      columnDef: 'price',
      header: 'Price',
      cell: (element: Listing) => `${element.price}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (element: Listing) => `${element.email}`,
    },
  ];

  bookingCols = [
    {
      columnDef: 'listing_id',
      header: 'listingId',
      cell: (element: Booking) => `${element.listing_id}`,
    },
    {
      columnDef: 'booking_id',
      header: 'bookingId',
      cell: (element: Booking) => `${element.booking_id}`,
    },
    {
      columnDef: 'booking_end',
      header: 'Check-Out',
      cell: (element: Booking) => `${element.booking_end}`,
    },
    {
      columnDef: 'booking_start',
      header: 'Chek-In',
      cell: (element: Booking) => `${element.booking_start}`,
    },
    {
      columnDef: 'booking_date',
      header: 'Booked-On',
      cell: (element: Booking) => `${element.booking_date}`,
    },
  ];
}
