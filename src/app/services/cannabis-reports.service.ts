import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { StrainResult } from './../models/strain-result.model';
import { Strain } from './../models/strain.model';

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

  getRawStrainInfo(ucpc: string): Observable<any> {
    const url = `${this.strainDetailsEndpoint}${ucpc}`;
    return this.http.get(url)
      .map(res => res.json().data)
  }

  getStrainDetails(ucpc: string): Observable<Strain> {
    return this.getRawStrainInfo(ucpc)
      .map(res => {
        return new Strain(
          res.name,
          res.ucpc,
          res.image,
          res.genetics,
          {
            countries: Object.keys(res.lineage),
            countryCodes: Object.keys(res.lineage).map(key => res.lineage[key])
          }
        )
      });
  }
}
