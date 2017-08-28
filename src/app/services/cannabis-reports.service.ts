import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { StrainResult } from './../models/strain-result.model';

import 'rxjs/add/operator/map';

@Injectable()
export class CannabisReportsService {

  public searchEndpoint = 'https://www.cannabisreports.com/api/v1.0/strains/search/'; //  /strain_name
  public strainDetailsEndpoint = `https://www.cannabisreports.com/api/v1.0/strains/`; //  /ucpc

  constructor(private http: Http) { }

  searchStrains(query: string): Observable<any> {
    const url = `${this.searchEndpoint}${query}`;
    return this.http.get(url)
      .map(res => res.json());
  }

  generateStrainResultModels(apiResponse: any): StrainResult[] {
    return apiResponse.data.map(s => new StrainResult(s.name, s.ucpc));
  }
}
