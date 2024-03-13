import { Component } from '@angular/core';
import { BaseSearchFormComponent } from '../base-search-form/base-search-form.component';
import {ApiPmcService} from "../services/api-pmc.service";

@Component({
  selector: 'app-search-form-pmc',
  templateUrl: './search-form-pmc.component.html',
  styleUrl: './search-form-pmc.component.scss'
})
export class SearchFormPmcComponent extends BaseSearchFormComponent {

  data: any;
  error: string = '';
  loading: boolean = false;
  constructor(private apiPmcService: ApiPmcService) {
    super();

    this.Title = "Локальный поиск PMC";
  }

  public override onSubmitButton() {
    this.formSubmitted = true;

    if (this.myForm.valid) {
      console.log(this.myForm.value)
      let text_val = this.myForm.controls.text.value
      let quartile_val = this.myForm.controls.quartile.value
      let country_val = this.myForm.controls.country.value;
      this.fetchData(text_val, +quartile_val, country_val);
    }
  }

  public fetchData(search_text: string, filter_quartile: number = 0, filter_country: string = '', size: number = 20, page: number = 0) {

    this.data = null;
    this.error = '';
    this.loading = true;

    this.apiPmcService.fetchData(search_text, filter_quartile, filter_country, size, page).subscribe({
      next: (response) => {
        this.data = response;
        this.error = '';
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.error = 'Error fetching data';
        this.data = null;
        this.loading = false;
      }
    });
  }

}
