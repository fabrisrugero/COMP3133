import {
  Listing,
  ListingsGQL,
  GetListingsByNameGQL,
  GetListingsByPostalCodeOrCityGQL,
} from '../../generated-types';
import { tableUtils } from '../table.utils';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { merge, of as observableOf } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-Listings',
  templateUrl: './Listings.component.html',
  styleUrls: ['./Listings.component.scss'],
})
export class ListingsComponent implements AfterViewInit, OnInit {
  resultsLength = 0;
  isDataNull = false;
  data: Listing[] = [];
  isLoadingResults = true;
  @ViewChild(MatSort) sort: MatSort;
  columns = this.tablecols.listingCols;
  search: { name: string; searchtext: string };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  noDataColumns = this.columns.map((c) => c.columnDef);
  constructor(
    private readonly route: ActivatedRoute,
    private readonly tablecols: tableUtils,
    private readonly ListingsGql: ListingsGQL,
    private readonly ListingByNameGql: GetListingsByNameGQL,
    private readonly ListingByPostalCodeOrCityGqdl: GetListingsByPostalCodeOrCityGQL
  ) {
    this.search = { name: '', searchtext: '' };
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['search'] === 'name' && params['text'])
        this.search = { name: params['text'], searchtext: '' };
      else this.search = { searchtext: params['text'], name: '' };
    });
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          console.log(this.search);
          this.isLoadingResults = true;
          if (this.search.searchtext)
            return this.ListingByPostalCodeOrCityGqdl.fetch(this.search).pipe(
              map((result) => result.data.getListingsByPostalCodeOrCity),
              catchError(() => observableOf(null))
            );
          else if (this.search.name)
            return this.ListingByNameGql.fetch(this.search).pipe(
              map((result) => result.data.getListingsByName),
              catchError(() => observableOf(null))
            );
          else
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
