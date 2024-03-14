import {ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseSearchFormComponent } from './base-search-form/base-search-form.component';
import { SearchFormPmcComponent } from './search-form-pmc/search-form-pmc.component';
import { SearchFormPubmedComponent } from './search-form-pubmed/search-form-pubmed.component';
import {NgOptimizedImage} from "@angular/common";
import { BaseDetailsComponent } from './base-details/base-details.component';
import { DetailsPmcComponent } from './details-pmc/details-pmc.component';
import { DetailsPubmedComponent } from './details-pubmed/details-pubmed.component';
import { NotFound404Component } from './not-found-404/not-found-404.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseSearchFormComponent,
    SearchFormPmcComponent,
    SearchFormPubmedComponent,
    BaseDetailsComponent,
    DetailsPmcComponent,
    DetailsPubmedComponent,
    NotFound404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgOptimizedImage
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
