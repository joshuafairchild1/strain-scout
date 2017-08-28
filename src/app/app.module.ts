import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { CannabisReportsService } from './services/cannabis-reports.service';

import { AppComponent } from './app.component';
import { StrainSearchComponent } from './strain-search/strain-search.component';
import { StrainResultsComponent } from './strain-results/strain-results.component';
import { StrainDetailsComponent } from './strain-details/strain-details.component';

@NgModule({
  declarations: [
    AppComponent,
    StrainSearchComponent,
    StrainResultsComponent,
    StrainDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [ CannabisReportsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
