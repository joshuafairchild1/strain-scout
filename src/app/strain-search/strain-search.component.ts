import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { StrainResult } from './../models/strain-result.model';
import { CannabisReportsService } from './../services/cannabis-reports.service';

@Component({
  selector: 'app-strain-search',
  templateUrl: './strain-search.component.html',
  styleUrls: ['./strain-search.component.sass']
})
export class StrainSearchComponent {

  private searchResults: StrainResult[] = null;
  private currentPageNumber: number = null;
  private searchedStrainEndpoint: string = null;
  private savedSearchResults: object = {};
  private pageArray: number[] = null;

  constructor(
    private cannabisService: CannabisReportsService,
    private http: Http
  ) { }

  searchStrains(query: string): void {
    this.currentPageNumber = 1;
    this.searchedStrainEndpoint = `${this.cannabisService.searchEndpoint}${query}`;
    this.cannabisService.searchStrains(query)
      .subscribe(
        data => {
          let usedPages: number;
          const totalPages: number = data.meta.pagination.total_pages;
          totalPages >= 10 ? usedPages = 10 : usedPages = totalPages;
          this.pageArray = Array.from(new Array(usedPages), (val, index) => index + 1);

          this.setSearchResults(data, 1);
        },

        (error) => console.log(error.json())
      );
  }

  changePages(pageNumber: number): void {
    const url = `${this.searchedStrainEndpoint}/?page=${pageNumber}`;
    this.currentPageNumber = pageNumber;
    this.savedSearchResults[pageNumber]
        ? this.searchResults = this.savedSearchResults[pageNumber]
        : this.http.get(url)
            .map(res => res.json())
            .subscribe(data => this.setSearchResults(data, pageNumber));

  }

  setSearchResults(apiResponse: any, pageNumber: number): void {
    this.searchResults = this.generateStrainResultModels(apiResponse);
    this.savedSearchResults[pageNumber] = this.searchResults;
  }

  generateStrainResultModels(apiResponse: any): StrainResult[] {
    return apiResponse.data.map(strain => new StrainResult(strain.name, strain.ucpc));
  }

}
