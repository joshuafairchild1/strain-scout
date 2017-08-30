import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { StrainResult } from './../models/strain-result.model';
import { Strain } from './../models/strain.model';

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
      .map(res => res.json().data);
  }

  getStrainDetails(ucpc: string): Observable<Strain> {
    const strainEffects: Observable<any> = this.getStrainEffects(ucpc);

    const strainDetailResponse: Observable<any> = this.getRawStrainInfo(ucpc);

    const strain: Observable<Strain> =
      Observable.forkJoin([strainDetailResponse, strainEffects])
        .map((res: any) => {
          return new Strain(
            res[0].name,
            res[0].ucpc,
            res[0].image,
            res[0].genetics,
            {
              countries: Object.keys(res[0].lineage),
              countryCodes: Object.keys(res[0].lineage).map(key => res[0].lineage[key])
            },
            res[1]
          );
        });

    return strain;
  }

  getStrainEffects(ucpc: string): Observable<any> {
    const url = `https://www.cannabisreports.com/api/v1.0/strains/${ucpc}/effectsFlavors`;
    return this.http.get(url)
      .map((res: any): any => res.json().data)
      .map((effs: any): any => {
        return {
          effects: {
            euphoria: effs.euphoria,
            creativity: effs.creativity,
            calming: effs.calming,
            numbness: effs.numbness,
            appetite_gain: effs.appetite_gain,
            dry_mouth: effs.dry_mouth,
            anxiety: effs.anxiety
          },
          flavors: {
            fruity: effs.fruity,
            spicy: effs.spicy,
            earthy: effs.earthy,
            sour: effs.sour,
            sweet: effs.sweet,
            pine: effs.pine,
          }
        };
      });
  }
}
