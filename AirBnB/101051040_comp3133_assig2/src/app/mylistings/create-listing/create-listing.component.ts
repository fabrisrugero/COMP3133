import {
  ListingInput,
  ListingsDocument,
  CreateListingGQL,
} from '../../../generated-types';
import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss'],
})
export class CreateListingComponent {
  listingError: string;
  listingForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    city: ['', [Validators.required]],
    street: ['', [Validators.required]],
    listingId: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    price: [100.0, [Validators.required, Validators.min(0)]],
    description: ['', [Validators.required, Validators.maxLength(50)]],
  });
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly createListingGql: CreateListingGQL,
    private readonly dialogRef: MatDialogRef<CreateListingComponent>
  ) {}

  get email() {
    return this.listingForm.get('email');
  }
  get price() {
    return this.listingForm.get('price');
  }
  get name() {
    return this.listingForm.get('name');
  }
  get city() {
    return this.listingForm.get('city');
  }
  get street() {
    return this.listingForm.get('street');
  }
  get listingId() {
    return this.listingForm.get('listingId');
  }
  get postalCode() {
    return this.listingForm.get('postalCode');
  }
  get description() {
    return this.listingForm.get('description');
  }
  getPriceErrorMessage() {
    if (this.email?.hasError('required')) return 'You must enter a price';
    return this.email?.hasError('min')
      ? 'price must not be less than zero'
      : '';
  }
  getEmailErrorMessage() {
    if (this.email?.hasError('required')) return 'You must enter an email';
    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }
  getDescriptionErrorMessage() {
    if (this.email?.hasError('required')) return 'You must enter a description';
    return this.email?.hasError('maxlength')
      ? 'you hhave exceeded 50 characters max limit'
      : '';
  }
  onSubmit() {
    this.createListingGql
      .mutate(
        {
          data: this.listingForm.value as ListingInput,
        },
        {
          refetchQueries: [
            {
              query: ListingsDocument,
            },
          ],
        }
      )
      .subscribe((result) => {
        if (result.errors)
          this.listingError = JSON.stringify(
            result.errors.map((error) => error.message)
          );
        else this.dialogRef.close();
      });
  }
}
