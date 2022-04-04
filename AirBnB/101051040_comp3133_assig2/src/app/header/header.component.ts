import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.verifyservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<number>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.isLoggedIn$ = authService.authenticated$;
  }

  ngOnInit(): void {}

  onCustomerLogout() {
    this.authService.logout();
  }

  onAdminLogout() {
    this.authService.logout();
  }

  isNotSignInRoute() {
    return this.router.url !== '/login';
  }

  isNotSignUpRoute() {
    return this.router.url !== '/signup';
  }
}
