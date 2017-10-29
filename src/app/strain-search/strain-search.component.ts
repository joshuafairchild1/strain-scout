import { Component } from '@angular/core';
import { StrainResult } from './../models/strain-result.model';
import { CannabisReportsService } from './../services/cannabis-reports.service';

@Component({
  selector: 'app-strain-search',
  templateUrl: './strain-search.component.html',
  styleUrls: ['./strain-search.component.sass']
})
export class StrainSearchComponent {

  searchResults: StrainResult[] = null;
  private currentPageNumber: number = null;
  private searchedStrainEndpoint: string = null;
  private savedSearchResults: object = {};
  private pageArray: number[] = null;

  constructor(
    private cannabisService: CannabisReportsService
  ) { }

  searchStrains(query: string): void {
    this.savedSearchResults = {}
    this.currentPageNumber = 1;
    this.searchedStrainEndpoint = `https://www.cannabisreports.com/api/v1.0/strains/search/${query}`;
    this.cannabisService.searchStrains(query)
      .subscribe(
        data => {
          const totalPages: number = data.meta.pagination.total_pages;
          const usedPages: number = totalPages >= 10 ? 10 : totalPages;
          this.pageArray = Array.from(new Array(usedPages), (val, index) => index + 1);
          this.setSearchResults(data, 1);
        }, error => console.log(error));
  }

  changePages(pageNumber: number): void {
    const url = `${this.searchedStrainEndpoint}&page=${pageNumber}`;
    this.currentPageNumber = pageNumber;
    (this.savedSearchResults[pageNumber])
        ? this.searchResults = this.savedSearchResults[pageNumber]
        : this.cannabisService.get(url)
            .subscribe(
              data => this.setSearchResults(data, pageNumber),
              error => console.log(error)
            );

  }

  setSearchResults(apiResponse: any, pageNumber: number): void {
    const results = apiResponse.data.map(strain => new StrainResult(strain.name, strain.ucpc));
    this.searchResults = results
    this.savedSearchResults[pageNumber] = results;
  }

}
