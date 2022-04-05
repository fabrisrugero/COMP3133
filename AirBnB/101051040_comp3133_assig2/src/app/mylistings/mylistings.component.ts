import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Listing, ListingsGQL } from '../../generated-types';
import { CreateListingComponent } from '../mylistings/create-listing/create-listing.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-mylistings',
  templateUrl: './mylistings.component.html',
  styleUrls: ['./mylistings.component.scss'],
})
export class MylistingsComponent implements AfterViewInit {
  resultsLength = 0;
  isDataNull = false;
  data: Listing[] = [];
  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  columns = [
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
  displayedColumns = this.columns.map((c) => c.columnDef);
  constructor(
    private readonly dialog: MatDialog,
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
            map((result) => {
              console.log(result.error);
              console.log(result.errors);
              return result.data.getListings;
            }),
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

  onFabClick() {
    this.dialog.open(CreateListingComponent);
  }
}
