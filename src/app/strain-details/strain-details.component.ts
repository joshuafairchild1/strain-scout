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
  private effectsChartData: string[] = null;
  private effectsChartLabels: string[] = null;
  private flavorsChartData: string[] = null;
  private flavorsChartLabels: string[] = null;
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
        console.log(strainModel)

        this.effectsChartLabels = this.createChartLabels(this.selectedStrain, 'effects');
        this.effectsChartData = this.createChartData(this.selectedStrain, 'effects');
        this.flavorsChartLabels = this.createChartLabels(this.selectedStrain, 'flavors');
        this.flavorsChartData = this.createChartData(this.selectedStrain, 'flavors');
        this.chartsValid = this.effectsAndFlavorsValid(this.effectsChartData, this.flavorsChartData);
        console.log(this.effectsChartData)
        console.log(this.flavorsChartData)
        console.log(this.chartsValid)

        /* To initialize the Materialize tabs only
        after the selectedStrain has been defined */
        $(() => {
          $('ul.tabs').tabs();
        });
      },

      (error) => console.log(error.json())
    );
  }

  createChartLabels(strain: Strain, chartName: string): string[] {
    return Object.keys(strain.effects_flavors[chartName])
      .filter(key => strain.effects_flavors[chartName][key])
      .map(label => label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, ' '));
  }

  createChartData(strain: Strain, chartName: string): string[] {
    return Object.keys(strain.effects_flavors[chartName])
      .map(key => strain.effects_flavors[chartName][key])
      .filter(val => val);
  }

  effectsAndFlavorsValid(effects: string[], flavors: string[]): boolean {
    return !!(effects.length && flavors.length);
  }
}
