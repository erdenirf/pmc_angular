import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchFormPmcComponent} from "./search-form-pmc/search-form-pmc.component";
import {SearchFormPubmedComponent} from "./search-form-pubmed/search-form-pubmed.component";

const routes: Routes = [
  { path: '', component: SearchFormPmcComponent },
  { path: 'pubmed', component: SearchFormPubmedComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
