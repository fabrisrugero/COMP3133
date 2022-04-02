import { ListingsComponent } from './listings/listings.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { RouterModule, Routes } from '@angular/router';
import { MylistingsComponent } from './mylistings/mylistings.component';
import { AvailablelistingsComponent } from './availablelistings/availablelistings.component';
import { BookingsComponent } from './bookings/bookings.component';
import { MybookingsComponent } from './mybookings/mybookings.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListingsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'mylistings',
    component: MylistingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'availablelistings',
    component: AvailablelistingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'allbookings',
    component: BookingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'mybookings',
    component: MybookingsComponent,
    canActivate: [AuthGuard],
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
