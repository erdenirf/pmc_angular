import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SearchFormPmcComponent} from "./search-form-pmc/search-form-pmc.component";
import {SearchFormPubmedComponent} from "./search-form-pubmed/search-form-pubmed.component";
import {DetailsPmcComponent} from "./details-pmc/details-pmc.component";
import {DetailsPubmedComponent} from "./details-pubmed/details-pubmed.component";
import {NotFound404Component} from "./not-found-404/not-found-404.component";

const routes: Routes = [
  { path: '', component: SearchFormPmcComponent },
  { path: 'PMC', component: SearchFormPmcComponent },
  { path: 'pubmed', component: SearchFormPubmedComponent },
  { path: 'PMC/:id', component: DetailsPmcComponent },
  { path: 'pubmed/:id', component: DetailsPubmedComponent },
  //Wild Card Route for 404 request
  { path: '**', pathMatch: 'full', component: NotFound404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
