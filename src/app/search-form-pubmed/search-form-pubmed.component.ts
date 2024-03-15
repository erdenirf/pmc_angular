import {Component} from '@angular/core';
import {BaseSearchFormComponent} from "../base-search-form/base-search-form.component";
import {ApiPubmedService} from "../services/api-pubmed.service";
import ElasticModelPubmed from "../models/ElasticModelPubMed";
import BaseModel from "../models/BaseModel";
import {ModelPubmed} from "../models/ModelPubmed";

@Component({
  selector: 'app-search-form-pubmed',
  templateUrl: './search-form-pubmed.component.html',
  styleUrl: './search-form-pubmed.component.scss'
})
export class SearchFormPubmedComponent extends BaseSearchFormComponent {
  ResponseElastic: ElasticModelPubmed = new ElasticModelPubmed();
  Models: BaseModel[] = [];
  constructor(private apiPubmedService: ApiPubmedService) {
    super();

    this.Title = "Локальный поиск PubMed";
  }

  public override onSubmitButton() {
    this.formSubmitted = true;

    if (this.myForm.valid) {
      //console.log(this.myForm.value)
      this.search_text = this.myForm.controls.text.value
      this.filter_quartile = +this.myForm.controls.quartile.value
      this.filter_country = this.myForm.controls.country.value;
      this.page = 0;
      this.Models = [];
      this.fetchData(this.search_text, this.filter_quartile, this.filter_country, this.size, this.page);
    }
  }

  public onNextPageButton() {
    this.page++;
    this.fetchData(this.search_text, this.filter_quartile, this.filter_country, this.size, this.page);
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
        this.ResponseElastic = Object.assign(new ElasticModelPubmed(), this.data);
        for (let model of this.ResponseElastic.hits) {
          let baseModel = Object.assign(new ModelPubmed(), model._source).convert();
          this.Models.push(baseModel);
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error);
        this.data = null;
        this.error = 'Error fetching data';
        this.loading = false;
      }
    });
  }

  protected readonly Math = Math;
}
