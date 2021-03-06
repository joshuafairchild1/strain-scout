import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { routing } from './app.routing';
import { CannabisReportsService } from './services/cannabis-reports.service';

import { AppComponent } from './app.component';
import { StrainSearchComponent } from './strain-search/strain-search.component';
import { StrainDetailsComponent } from './strain-details/strain-details.component';

@NgModule({
  declarations: [
    AppComponent,
    StrainSearchComponent,
    StrainDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    routing
  ],
  providers: [ CannabisReportsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
