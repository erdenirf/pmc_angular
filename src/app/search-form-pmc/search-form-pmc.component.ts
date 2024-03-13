import { Component } from '@angular/core';
import { BaseSearchFormComponent } from '../base-search-form/base-search-form.component'

@Component({
  selector: 'app-search-form-pmc',
  templateUrl: './search-form-pmc.component.html',
  styleUrl: './search-form-pmc.component.scss'
})
export class SearchFormPmcComponent extends BaseSearchFormComponent {
  constructor() {
    super();

    this.Title = "Локальный поиск PMC";
  }

}
