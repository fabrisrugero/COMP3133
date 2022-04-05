import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MylistingsComponent } from './mylistings.component';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { CreateListingModule } from '../mylistings/create-listing/create-listing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    MylistingsComponent
  ],
  imports: [
    CommonModule,
    CreateListingModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  exports: [MylistingsComponent],
})
export class MylistingsModule { }
