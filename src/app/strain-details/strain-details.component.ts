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

  strain: Strain = null;
  private effectsChartData: any = null;
  private flavorsChartData: any = null;
  private chartsAreValid: boolean = null;

  constructor(
    private route: ActivatedRoute,
    private cannabisService: CannabisReportsService
  ) { }

  ngOnInit(): void {

    const strainObservable: Observable<any> =
      this.route.params
        .map((params): string => params['ucpc'])
        .mergeMap(ucpc => this.cannabisService.createStrainModel(ucpc));

    strainObservable.subscribe(
      (strainModel: Strain) => {
        this.strain = strainModel;
        this.effectsChartData = this.createChartData(this.strain, 'effects');
        this.flavorsChartData = this.createChartData(this.strain, 'flavors');
        this.chartsAreValid = !!(this.effectsChartData.values.length && this.flavorsChartData.values.length);

        /* To initialize the Materialize tabs only
        after the strain has been defined */
        $(() => $('ul.tabs').tabs());
      },

      error => console.log(error)
    );
  }


  createChartData(strain: Strain, chartName: string): any {
    // Gets the keys only for properties that are defined and not 0
    const unformattedLabels: string[] =
      Object.keys(strain.effects_flavors[chartName])
        .filter(key => +strain.effects_flavors[chartName][key]);

    const values = unformattedLabels
      .map(key => strain.effects_flavors[chartName][key]);

    const labels =  unformattedLabels
      .map(label => label.charAt(0).toUpperCase() + label.slice(1).replace(/_/g, ' '));

    return {labels, values};
  }
}
