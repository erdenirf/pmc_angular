import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BaseSearchFormComponent } from './base-search-form/base-search-form.component';
import { SearchFormPmcComponent } from './search-form-pmc/search-form-pmc.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BaseSearchFormComponent,
    SearchFormPmcComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
