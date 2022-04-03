import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.verifyservice';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      map((authenticated) => {
        if (authenticated === 0) {
          this.router.navigate(['/login']);
          return false;
        } else if (authenticated === 1) {
          this.router.navigate(['/']);
          return false;
        } else return true;
      })
    );
  }
}
