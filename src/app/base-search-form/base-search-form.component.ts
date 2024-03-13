import { Component } from '@angular/core';
import * as jsonData from './countries.json';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-base-search-form',
  templateUrl: './base-search-form.component.html',
  styleUrl: './base-search-form.component.scss'
})
export class BaseSearchFormComponent {
  protected Title = "Базовый компонент формы";

  protected countries = jsonData.countries;

  protected formSubmitted = false;

  protected myForm = new FormGroup({
    quartile: new FormControl('0', {nonNullable: true, validators: Validators.required}),
    text: new FormControl('', {nonNullable: true, validators: Validators.required}),
    country: new FormControl('', {nonNullable: true}),
  });

  public onSubmitButton() {
    this.formSubmitted = true;

    if (this.myForm.valid) {
      console.log(this.myForm.value)
    }

  }
}
