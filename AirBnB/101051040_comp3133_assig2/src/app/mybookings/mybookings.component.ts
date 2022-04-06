import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Booking, GetMyBookingsGQL } from '../../generated-types';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { tableUtils } from '../table.utils';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.scss'],
})
export class MybookingsComponent implements AfterViewInit {
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
    private readonly bookingsGql: GetMyBookingsGQL
  ) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.bookingsGql.fetch().pipe(
            map((result) => result.data.getMyBookings),
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
