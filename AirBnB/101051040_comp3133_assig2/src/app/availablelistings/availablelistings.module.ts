import { CreateBookingModule } from './create-booking/create-booking.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvailablelistingsComponent } from './availablelistings.component';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [AvailablelistingsComponent],
  imports: [
    CommonModule,
    CreateBookingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
  ],
  exports: [AvailablelistingsComponent],
})
export class AvailablelistingsModule {}
