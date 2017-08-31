import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params, Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import { CannabisReportsService } from './../services/cannabis-reports.service';
import { Strain } from './../models/strain.model';

// To keep compiler from complaining that '$' is not defined
declare var $: any;


@Component({
  selector: 'app-strain-details',
  templateUrl: './strain-details.component.html',
  styleUrls: ['./strain-details.component.sass']
})
export class StrainDetailsComponent implements OnInit {

  private selectedStrain: Strain = null;
  private effectsChartData: any = null;
  private flavorsChartData: any = null;
  private chartsValid: boolean = null;

  constructor(
    private route: ActivatedRoute,
    private cannabisService: CannabisReportsService
  ) { }

  ngOnInit(): void {

    const strain: Observable<any> =
      this.route.params
        .map(params => params['ucpc'])
        .mergeMap(ucpc => this.cannabisService.getStrainDetails(ucpc));

    strain.subscribe(
      (strainModel: Strain) => {
        this.selectedStrain = strainModel;
        this.effectsChartData = this.createChartData(this.selectedStrain, 'effects');
        this.flavorsChartData = this.createChartData(this.selectedStrain, 'flavors');
        this.chartsValid = effectsAndFlavorsValid(this.effectsChartData.values, this.flavorsChartData.values);

        /* To initialize the Materialize tabs only
        after the selectedStrain has been defined */
        $(() => {
          $('ul.tabs').tabs();
        });
      },

      (error) => console.log(error.json())
    );
  }

  createChartData(strain: Strain, chartName: string): any {
    const rawLabels = Object.keys(strain.effects_flavors[chartName])
      .filter(key => strain.effects_flavors[chartName][key]);

    const values = rawLabels
      .map(key => strain.effects_flavors[chartName][key])
      .filter(val => val);

    const labels =  rawLabels
      .map(label => label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, ' '));
    return {labels, values};
  }
}

const effectsAndFlavorsValid = (effects: string[], flavors: string[]): boolean => !!(effects.length && flavors.length);
