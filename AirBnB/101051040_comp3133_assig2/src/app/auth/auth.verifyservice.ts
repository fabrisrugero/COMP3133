import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JWTTokenService } from './auth.jwtservice';
import { LocalStorageService } from './auth.storageservice';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authenticated = new Subject<boolean>();
  authenticated$ = this.authenticated.asObservable();

  constructor(
    private authStorageService: LocalStorageService,
    private jwtService: JWTTokenService,
    private readonly router: Router
  ) {}

  isAuthenticated() {
    if (!this.jwtService.isTokenExpired()) {
      this.authenticated.next(true);
    } else {
      const storedJWT = this.authStorageService.get('jwtToken');
      if (storedJWT) {
        this.jwtService.setToken(storedJWT);
        if (!this.jwtService.isTokenExpired()) this.authenticated.next(true);
      }
    }
    this.authenticated.next(false);
    return this.authenticated;
  }

  logout() {
    this.authStorageService.remove('jwtToken');
    this.jwtService.destroyDecodedToken();
    this.authenticated.next(false);
    this.router.navigate(['/login']);
  }
}
