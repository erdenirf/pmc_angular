import {Component} from '@angular/core';
import {BaseSearchFormComponent} from "../base-search-form/base-search-form.component";
import {ApiPubmedService} from "../services/api-pubmed.service";
import ModelPubmedJson from "../models/ModelPubMed";

@Component({
  selector: 'app-search-form-pubmed',
  templateUrl: './search-form-pubmed.component.html',
  styleUrl: './search-form-pubmed.component.scss'
})
export class SearchFormPubmedComponent extends BaseSearchFormComponent {
  Model: ModelPubmedJson = new ModelPubmedJson();
  constructor(private apiPubmedService: ApiPubmedService) {
    super();

    this.Title = "Локальный поиск PubMed";
  }

  public override onSubmitButton() {
    this.formSubmitted = true;

    if (this.myForm.valid) {
      console.log(this.myForm.value)
      const text_val = this.myForm.controls.text.value
      const quartile_val = this.myForm.controls.quartile.value
      const country_val = this.myForm.controls.country.value;
      this.fetchData(text_val, +quartile_val, country_val);
    }
  }

  protected override fetchData(search_text: string, filter_quartile: number = 0, filter_country: string = '', size: number = 20, page: number = 0) {

    this.data = null;
    this.error = '';
    this.loading = true;

    this.apiPubmedService.fetchData(search_text, filter_quartile, filter_country, size, page).subscribe({
      next: (response) => {
        this.data = response;
        this.error = '';
        this.loading = false;
        this.Model = Object.assign(new ModelPubmedJson(), this.data);

      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.data = null;
        this.error = 'Error fetching data';
        this.loading = false;
      }
    });
  }
}
