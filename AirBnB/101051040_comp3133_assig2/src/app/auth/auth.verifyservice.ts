import { of, Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { JWTTokenService } from './auth.jwtservice';
import { LocalStorageService } from './auth.storageservice';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authenticated = new Subject<number>();
  authenticated$ = this.authenticated.asObservable();

  constructor(
    private authStorageService: LocalStorageService,
    private jwtService: JWTTokenService,
    private readonly router: Router
  ) {}

  isAuthenticated(): Observable<number> {
    let authenticated: number = 0;
    if (this.jwtService.isTokenExpired()) {
      const storedJWT = this.authStorageService.get('jwtToken');
      this.jwtService.setToken(storedJWT);
      if (this.jwtService.isTokenExpired()) {
        this.authenticated.next(authenticated);
        return of(authenticated);
      }
    }
    if (this.jwtService.getUserRole() === 'customer')
      this.authenticated.next((authenticated = 1));
    else if (this.jwtService.getUserRole() === 'admin')
      this.authenticated.next((authenticated = 2));
    return of(authenticated);
  }

  logout() {
    this.authStorageService.remove('jwtToken');
    this.jwtService.destroyDecodedToken();
    this.authenticated.next(0);
    this.router.navigate(['/login']);
  }
}
