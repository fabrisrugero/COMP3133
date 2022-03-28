import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private readonly loginService: LoginService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {}

  getEmailErrorMessage() {
    if (this.email.hasError('required')) return 'You must enter a value.';
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) return 'You must enter a value.';
    return '';
  }

  onSubmit() {
    let loginRequest = {
      username: this.email.value,
      password: this.password.value,
    };
    this.loginService.login(loginRequest).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
