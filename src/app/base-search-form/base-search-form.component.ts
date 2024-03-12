import { Component } from '@angular/core';
import * as jsonData from './countries.json';

@Component({
  selector: 'app-base-search-form',
  templateUrl: './base-search-form.component.html',
  styleUrl: './base-search-form.component.scss'
})
export class BaseSearchFormComponent {
  protected Title = "Базовый компонент формы";

  protected search = {
    quartile: 0,
    text: '',
    country: ''
  };

  protected countries = jsonData.countries;
}
