import {ReactiveFormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseSearchFormComponent } from './base-search-form/base-search-form.component';
import { SearchFormPmcComponent } from './search-form-pmc/search-form-pmc.component';
import { SearchFormPubmedComponent } from './search-form-pubmed/search-form-pubmed.component';

@NgModule({
  declarations: [
    AppComponent,
    BaseSearchFormComponent,
    SearchFormPmcComponent,
    SearchFormPubmedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
