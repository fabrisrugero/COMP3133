import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { concatMap } from 'rxjs';
import { CreateUserGQL, UserInput } from '../../../generated-types';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);

  constructor(
    private readonly createUserGql: CreateUserGQL,
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
    let data: UserInput = {
      username: this.email.value,
      password: this.password.value,
      email: 'string',
      firstname: 'string',
      lastname: 'string',
      type: 'string',
    };
    this.createUserGql
      .mutate({ data })
      .pipe(
        concatMap(() => {
          return this.loginService.login(data);
        })
      )
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
