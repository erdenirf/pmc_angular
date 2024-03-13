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
  protected data: any = null;
  protected error: string = '';
  protected loading: boolean = false;
  protected data_models: any[] = [];
  protected total: number = 0;

  protected myForm = new FormGroup({
    quartile: new FormControl('0', {nonNullable: true, validators: Validators.required}),
    text: new FormControl('', {nonNullable: true, validators: Validators.required}),
    country: new FormControl('', {nonNullable: true}),
  });

  protected onSubmitButton() {
    this.formSubmitted = true;

    if (this.myForm.valid) {
      console.log(this.myForm.value)
    }

  }

  protected fetchData(search_text: string, filter_quartile: number = 0, filter_country: string = '', size: number = 20, page: number = 0) { }
}
