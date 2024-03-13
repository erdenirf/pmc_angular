import { Component } from '@angular/core';
import {BaseSearchFormComponent} from "../base-search-form/base-search-form.component";

@Component({
  selector: 'app-search-form-pubmed',
  templateUrl: './search-form-pubmed.component.html',
  styleUrl: './search-form-pubmed.component.scss'
})
export class SearchFormPubmedComponent extends BaseSearchFormComponent {
  constructor() {
    super();

    this.Title = "Локальный поиск Pubmed";
  }

}
