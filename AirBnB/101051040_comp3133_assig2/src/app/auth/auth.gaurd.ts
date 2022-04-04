import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.verifyservice';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate() {
    return this.authService.isAuthenticated().pipe(map(() => true));
  }
}
