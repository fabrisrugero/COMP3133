import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Listing, ListingsGQL } from '../../generated-types';
import { CreateListingComponent } from './create-listing/create-listing.component';

@Component({
  selector: 'app-Listings',
  templateUrl: './Listings.component.html',
  styleUrls: ['./Listings.component.scss'],
})
export class ListingsComponent implements OnInit {
  Listings$: Observable<Listing[]> = new Observable<Listing[]>();

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly ListingsGql: ListingsGQL
  ) {}

  ngOnInit(): void {
    this.Listings$ = this.ListingsGql.watch().valueChanges.pipe(
      map((result) => result.data.getListings)
    );
  }

  onFabClick() {
    this.dialog.open(CreateListingComponent);
  }

  onListingClick(ListingId: string) {
    this.router.navigate(['/Listings', ListingId]);
  }
}
