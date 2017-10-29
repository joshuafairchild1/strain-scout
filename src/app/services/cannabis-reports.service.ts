import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { StrainResult } from './../models/strain-result.model';
import { Strain } from './../models/strain.model';
import { Headers } from '@angular/http';

@Injectable()
export class CannabisReportsService {

  public searchEndpoint = 'https://www.cannabisreports.com/api/v1.0/strains/search/'; //  /strain_name
  private strainDetailsEndpoint = `https://www.cannabisreports.com/api/v1.0/strains/`; //  /ucpc

  constructor(private http: Http) { }

  get(url: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/pages/${url}`)
      .map(res => res.json())
  }

  searchStrains(query: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/search/${query}`)
      .map(res => res.json());
  }

  getRawStrainInfo(ucpc: string): Observable<any> {
    return this.http.get(`http://localhost:3000/api/details/${ucpc}`)
      .map(res => res.json().data);
  }

  createStrainModel(ucpc: string): Observable<Strain> {
    const strainEffects: Observable<any> = this.getStrainEffects(ucpc);
    const strainDetails: Observable<any> = this.getRawStrainInfo(ucpc);

    /* forkJoin is used here to avoid the issue caused by needing an
       object (strain) that requires data received by multiple api calls.
       Alternatives would be a nested subscription on the two observables above,
       or flatMapping within a subscription. I decided this was the
       most eloquent solution. */
    return Observable.forkJoin([strainDetails, strainEffects])
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
  }

  getStrainEffects(ucpc: string): Observable<any> {
    const url = `http://localhost:3000/api/effectsFlavors/${ucpc}`;
    return this.http.get(url)
      .map((res: any): any => res.json().data)
      .map((effs: any): any => {

        /* NOTE At this point the object being returned should
           definitely have a model of its own... */
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
