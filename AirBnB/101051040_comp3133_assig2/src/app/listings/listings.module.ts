import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingsComponent } from './listings.component';
import { CreateListingModule } from '../mylistings/create-listing/create-listing.module';

@NgModule({
  declarations: [ListingsComponent],
  imports: [
    CommonModule,
    CreateListingModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  exports: [ListingsComponent],
})
export class ListingsModule {}
