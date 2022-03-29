import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../generated-types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly httpClient: HttpClient) {}

  login(loginRequest: { username: string; password: string }) {
    return this.httpClient.post<User>('api/auth/login', loginRequest);
  }
}
