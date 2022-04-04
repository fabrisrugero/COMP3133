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
    this.jwtToken = '';
    this.decodedToken = {};
  }

  getDecodedToken() {
    return jwt_decode(this.jwtToken);
  }

  decodeToken() {
    if (this.jwtToken) {
      try {
        this.decodedToken = jwt_decode(this.jwtToken);
      } catch (error) {
        console.log('error');
        this.decodedToken = {};
      }
    }
  }
  getUser() {
    this.decodeToken();
    return Object.keys(this.decodedToken).length > 0
      ? this.decodedToken['username']
      : null;
  }

  getEmail() {
    this.decodeToken();
    return Object.keys(this.decodedToken).length > 0
      ? this.decodedToken['email']
      : null;
  }

  getUserRole() {
    this.decodeToken();
    return Object.keys(this.decodedToken).length > 0
      ? this.decodedToken['type']
      : null;
  }

  getExpiryTime() {
    this.decodeToken();
    return Object.keys(this.decodedToken).length > 0
      ? this.decodedToken['exp']
      : '1000';
  }

  isTokenExpired(): boolean {
    const expiryTime: number = parseInt(this.getExpiryTime());
    if (expiryTime > 0) return 1000 * expiryTime - new Date().getTime() < 5000;
    else return false;
  }
}
