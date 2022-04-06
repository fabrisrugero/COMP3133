import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Listing, GetMyListingsGQL } from '../../generated-types';
import { CreateListingComponent } from '../mylistings/create-listing/create-listing.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { tableUtils } from '../table.utils';

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
  @ViewChild(MatSort) sort: MatSort;
  columns = this.tablecols.listingCols;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  noDataColumns = this.columns.map((c) => c.columnDef);
  constructor(
    private readonly dialog: MatDialog,
    private readonly tablecols: tableUtils,
    private readonly ListingsGql: GetMyListingsGQL
  ) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.ListingsGql.fetch().pipe(
            map((result) => result.data.getMyListings),
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
