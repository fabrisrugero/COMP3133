import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Listing, ListingsGQL } from '../../generated-types';
import { CreateListingComponent } from './create-listing/create-listing.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-Listings',
  templateUrl: './Listings.component.html',
  styleUrls: ['./Listings.component.scss'],
})
export class ListingsComponent implements AfterViewInit {
  resultsLength = 0;
  data: Listing[] = [];
  isLoadingResults = true;
  isRateLimitReached = false;
  displayedColumns: string[] = ['created', 'state', 'number', 'title'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly ListingsGql: ListingsGQL
  ) {}

  ngAfterViewInit(): void {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.ListingsGql.fetch().pipe(
            map((result) => result.data.getListings),
            catchError(() => observableOf(null))
          );
        }),
        map((data) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;
          if (data === null) return [];
          this.resultsLength = data.length;
          return data;
        })
      )
      .subscribe((data) => (this.data = data));
  }

  onFabClick() {
    this.dialog.open(CreateListingComponent);
  }

  onListingClick(ListingId: string) {
    this.router.navigate(['/Listings', ListingId]);
  }
}
