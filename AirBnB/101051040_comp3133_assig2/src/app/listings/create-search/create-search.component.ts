import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

interface Fields {
  field: string;
  fieldValue: string;
}
@Component({
  selector: 'app-create-search',
  templateUrl: './create-search.component.html',
  styleUrls: ['./create-search.component.scss'],
})
export class CreateSearchComponent {
  fields: Fields[] = [
    { fieldValue: 'listing name', field: 'name' },
    { fieldValue: 'postalCode or City', field: 'postalcodeorcity' },
  ];
  searchForm = this.formBuilder.group({
    search: [null, [Validators.required]],
    text: ['', [Validators.required, Validators.maxLength(10)]],
  });
  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder
  ) {}
  get text() {
    return this.searchForm.get('text');
  }
  get search() {
    return this.searchForm.get('search');
  }
  getTextErrorMessage() {
    if (this.text?.hasError('required')) return 'You must enter a text.';
    return this.text?.hasError('maxlength')
      ? this.text?.errors
        ? JSON.stringify(this.text?.errors['maxlength'])
        : 'search text is too long'
      : '';
  }
  onSubmit() {
    this.router.navigate(['/'], { queryParams: this.searchForm.value });
  }
}
