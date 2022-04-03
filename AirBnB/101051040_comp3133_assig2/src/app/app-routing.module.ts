import { ListingsComponent } from './listings/listings.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { AdminGuard } from './auth/admin.guard';
import { RouterModule, Routes } from '@angular/router';
import { MylistingsComponent } from './mylistings/mylistings.component';
import { AvailablelistingsComponent } from './availablelistings/availablelistings.component';
import { BookingsComponent } from './bookings/bookings.component';
import { MybookingsComponent } from './mybookings/mybookings.component';
import { CustomerGuard } from './auth/customer.guard';
import { AuthGuard } from './auth/auth.gaurd';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mylistings',
    component: MylistingsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'availablelistings',
    component: AvailablelistingsComponent,
    canActivate: [CustomerGuard],
  },
  {
    path: 'allbookings',
    component: BookingsComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'mybookings',
    component: MybookingsComponent,
    canActivate: [CustomerGuard],
  },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
