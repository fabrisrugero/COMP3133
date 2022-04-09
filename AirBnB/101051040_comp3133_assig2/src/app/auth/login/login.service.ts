import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../../generated-types';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private readonly httpClient: HttpClient) {}
  isUser(result: User | { error: string }): result is User {
    return (result as User).token !== undefined;
  }
  login(loginRequest: { username: string; password: string }) {
    return this.httpClient.post<User | { error: string }>(
      'api/auth/login',
      loginRequest
    );
  }
}
