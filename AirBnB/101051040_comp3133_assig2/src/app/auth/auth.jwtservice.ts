import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable()
export class JWTTokenService {
  jwtToken: string;
  decodedToken: { [key: string]: string };

  constructor() {
    this.jwtToken = '';
    this.decodedToken = {};
  }

  setToken(token: string) {
    if (token) {
      this.jwtToken = token;
    }
  }

  destroyDecodedToken() {
    this.decodedToken = {};
  }

  getDecodedToken() {
    return jwt_decode(this.jwtToken);
  }
  
  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }
  getUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['username'] : null;
  }

  getEmail() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['email'] : null;
  }

  getUserRole() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['type'] : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : '0';
  }

  isTokenExpired(): boolean {
    const expiryTime: number = parseInt(this.getExpiryTime());
    if (expiryTime > 0) {
      return 1000 * expiryTime - new Date().getTime() < 5000;
    } else {
      return false;
    }
  }
}
