import { User } from './../../../generated-types';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';
import { JWTTokenService } from '../auth.jwtservice';
import { LocalStorageService } from '../auth.storageservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginError: string = '';
  loginForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly jwtService: JWTTokenService,
    private readonly loginService: LoginService,
    private readonly authStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }
  onSubmit() {
    this.loginService
      .login(this.loginForm.value)
      .subscribe((result: User | { error: string }) => {
        if (this.loginService.isUser(result)) {
          this.authStorageService.set('jwtToken', result.token);
          this.jwtService.setToken(result.token);
          if (result.type === 'admin') this.router.navigate(['/mylistings']);
          else this.router.navigate(['/mybookings']);
        } else this.loginError = result.error;
      });
  }
}
