import { Component } from '@angular/core';
import { BaseSearchFormComponent } from '../base-search-form/base-search-form.component';
import {ApiPmcService} from "../services/api-pmc.service";
import ModelPMC from "../models/ModelPMC";

@Component({
  selector: 'app-search-form-pmc',
  templateUrl: './search-form-pmc.component.html',
  styleUrl: './search-form-pmc.component.scss'
})
export class SearchFormPmcComponent extends BaseSearchFormComponent {

  constructor(private apiPmcService: ApiPmcService) {
    super();

    this.Title = "Локальный поиск PMC";
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
    this.data_models = [];
    this.total = 0;

    this.apiPmcService.fetchData(search_text, filter_quartile, filter_country, size, page).subscribe({
      next: (response) => {
        this.data = response;
        this.error = '';
        this.loading = false;

        this.total = this.data.total.value;
        this.data.hits.forEach((element: any) => {
          const source = element._source;
          const obj = new ModelPMC(
            {
              "journal": source.journal,
              "PMID": source.PMID,
              "PMCID": source.PMCID,
              "DOI": source.DOI,
              "Title": source.Title,
              "Author": source.Author,
              "date": source.date,
              "date_epub": source.date_epub,
              "Abstract": source.Abstract,
              "Text_full": source.Text_full,
              "Glossary": source.Glossary,
              "Categories": source.Categories,
              "Affiliations": source.Affiliations,
              "book": source.book,
              "Ref_ids": source.Ref_ids,
              "References": source.References,
            });
          this.data_models.push(obj);
        });

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
