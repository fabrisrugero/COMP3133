import {
  CreateBookingGQL,
  GetAvailableListingsDocument,
} from '../../../generated-types';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  ListingName = new FormControl('', [Validators.required]);

  constructor(
    private readonly createBookingGQL: CreateBookingGQL,
    private readonly dialogRef: MatDialogRef<CreateBookingComponent>
  ) {}

  ngOnInit(): void {}

  getListingNameError() {
    if (this.ListingName.hasError('required')) {
      return 'You must enter a value.';
    }
    return '';
  }

  createBooking() {
    this.createBookingGQL
      .mutate(
        {
          data: {
            booking_date: 'String',
            booking_end: 'String',
            booking_id: 'String',
            booking_start: 'String',
            listing_id: 'String',
          },
        },
        {
          refetchQueries: [
            {
              query: GetAvailableListingsDocument,
            },
          ],
        }
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
