import {
  BookingInput,
  CreateBookingGQL,
  GetAvailableListingsDocument,
} from '../../../generated-types';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  bookingError: string;
  bookingForm = this.formBuilder.group({
    listing_id: ['', [Validators.required]],
    booking_end: ['', [Validators.required]],
    booking_start: ['', [Validators.required]],
    booking_date: [new Date(), [Validators.required]],
    booking_id: [
      Math.floor(Math.random() * 1000).toString(),
      [Validators.required],
    ],
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly createBookingGQL: CreateBookingGQL,
    private readonly dialogRef: MatDialogRef<CreateBookingComponent>
  ) {}

  ngOnInit(): void {}
  get end() {
    return this.bookingForm.get('booking_end');
  }
  get start() {
    return this.bookingForm.get('booking_start');
  }
  get listingId() {
    return this.bookingForm.get('listing_id');
  }
  onSubmit() {
    this.bookingError = '';
    console.log(JSON.stringify(this.bookingForm.value));
    this.createBookingGQL
      .mutate(
        { data: this.bookingForm.value as BookingInput },
        {
          refetchQueries: [
            {
              query: GetAvailableListingsDocument,
            },
          ],
        }
      )
      .subscribe((result) => {
        if (result.errors)
          this.bookingError = JSON.stringify(
            result.errors.map((error) => error.message)
          );
        else this.dialogRef.close();
      });
  }
}
