import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Listing, ListingsGQL } from '../../generated-types';
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
  isDataNull = false;
  data: Listing[] = [];
  isLoadingResults = true;
  displayedColumns: string[] = [
    'listingId',
    'name',
    'street',
    'postalCode',
    'price',
    'email',
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private readonly ListingsGql: ListingsGQL
  ) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
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
          this.isDataNull = data === null;
          if (data === null) return [];
          this.resultsLength = data.length;
          return data;
        })
      )
      .subscribe((data) => (this.data = data));
  }
}
