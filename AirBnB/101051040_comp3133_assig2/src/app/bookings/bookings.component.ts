import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Booking, GetBookingsGQL } from '../../generated-types';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { tableUtils } from '../table.utils';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements AfterViewInit {
  resultsLength = 0;
  isDataNull = false;
  data: Booking[] = [];
  isLoadingResults = true;
  @ViewChild(MatSort) sort: MatSort;
  columns = this.tablecols.bookingCols;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  noDataColumns = this.columns.map((c) => c.columnDef);
  constructor(
    private readonly tablecols: tableUtils,
    private readonly bookingsGql: GetBookingsGQL
  ) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.bookingsGql.fetch().pipe(
            map((result) => result.data.getBookings),
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

