import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CannabisReportsService } from './../services/cannabis-reports.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Strain } from './../models/strain.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';


@Component({
  selector: 'app-strain-details',
  templateUrl: './strain-details.component.html',
  styleUrls: ['./strain-details.component.sass']
})
export class StrainDetailsComponent implements OnInit {

  private selectedStrain: Strain = null;
  private chartOptions: any = {
    animation: {
      animateRotate: true,
      animateScale: true
    }

  }

  constructor(
    private route: ActivatedRoute,
    private cannabisService: CannabisReportsService
  ) { }

  ngOnInit(): void {

    const strain: Observable<any> =
      this.route.params
        .map(params => params['ucpc'])
        .mergeMap(ucpc => this.cannabisService.getStrainDetails(ucpc));

    strain.subscribe((strainModel: Strain) => {
      this.selectedStrain = strainModel;
      console.log(this.selectedStrain);

      // To initialize the Materialize tabs NOT before the strain data is ready
      $(() => {
        $('ul.tabs').tabs();
      });
    });
  }

  getStrainEffectValues(): number[] {
    return Object.keys(this.selectedStrain.effects_flavors.effects)
      .map(eff => this.selectedStrain.effects_flavors.effects[eff] as number);
  }

  getStrainEffectKeys(): string[] {
    return Object.keys(this.selectedStrain.effects_flavors.effects);
  }

}

// To keep compiler from complaining that '$' is not defined
declare var $:any
