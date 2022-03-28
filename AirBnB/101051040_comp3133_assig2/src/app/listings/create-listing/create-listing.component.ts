import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ListingsDocument, CreateListingGQL } from '../../../generated-types';

@Component({
  selector: 'app-create-listing',
  templateUrl: './create-listing.component.html',
  styleUrls: ['./create-listing.component.scss'],
})
export class CreateListingComponent implements OnInit {
  ListingName = new FormControl('', [Validators.required]);

  constructor(
    private readonly createListingGql: CreateListingGQL,
    private readonly dialogRef: MatDialogRef<CreateListingComponent>
  ) {}

  ngOnInit(): void {}

  getListingNameError() {
    if (this.ListingName.hasError('required')) {
      return 'You must enter a value.';
    }
    return '';
  }

  createListing() {
    this.createListingGql
      .mutate(
        {
          data: {
            city: 'String',
            description: 'String',
            email: 'String',
            listingId: 'String',
            name: 'String',
            postalCode: 'String',
            price: 0.8,
            street: 'String',
          },
        },
        {
          refetchQueries: [
            {
              query: ListingsDocument,
            },
          ],
        }
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }
}
