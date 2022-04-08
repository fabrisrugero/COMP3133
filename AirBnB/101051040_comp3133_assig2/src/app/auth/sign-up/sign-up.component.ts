import { User } from './../../../generated-types';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { concatMap } from 'rxjs';
import { CreateUserGQL, UserInput } from '../../../generated-types';
import { LoginService } from '../login/login.service';
import { JWTTokenService } from '../auth.jwtservice';
import { LocalStorageService } from '../auth.storageservice';

interface roles {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpError: string = '';
  types: roles[] = [
    { viewValue: 'customer', value: 'customer' },
    { viewValue: 'administrator', value: 'admin' },
  ];
  registerForm = this.formBuilder.group({
    type: [null, [Validators.required]],
    username: ['', [Validators.required]],
    firstname: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(10)]],
  });

  constructor(
    private readonly router: Router,
    private formBuilder: FormBuilder,
    private jwtService: JWTTokenService,
    private readonly loginService: LoginService,
    private readonly createUserGql: CreateUserGQL,
    private authStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {}
  get type() {
    return this.registerForm.get('type');
  }
  get username() {
    return this.registerForm.get('username');
  }
  get firstname() {
    return this.registerForm.get('firstname');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get lastname() {
    return this.registerForm.get('lastname');
  }
  getEmailErrorMessage() {
    if (this.email?.hasError('required')) return 'You must enter an email';
    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }
  getPassErrorMessage() {
    if (this.password?.hasError('required'))
      return 'You must enter a password.';
    return this.password?.hasError('minlength')
      ? this.password?.errors
        ? JSON.stringify(this.password?.errors['minlength'])
        : 'password is too short'
      : '';
  }
  isUser(result: User | { error: string }): result is User {
    return (result as User).token !== undefined;
  }
  onSubmit() {
    this.signUpError = '';
    let data: UserInput = this.registerForm.value;
    this.createUserGql
      .mutate({ data })
      .pipe(
        concatMap((result) => {
          if (result.errors)
            this.signUpError = JSON.stringify(
              result.errors.map((error) => error.message)
            );
          const creds = { username: data.username, password: data.password };
          return this.loginService.login(creds);
        })
      )
      .subscribe((result: User | { error: string }) => {
        if (this.isUser(result)) {
          this.authStorageService.set('jwtToken', result.token);
          this.jwtService.setToken(result.token);
          if (result.type === 'admin') this.router.navigate(['/mylistings']);
          else this.router.navigate(['/mybookings']);
        } else if (this.signUpError === '') this.signUpError += result.error;
      });
  }
}
