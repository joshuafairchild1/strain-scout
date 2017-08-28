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

  selectedStrain: Strain = null;

  constructor(
    private route: ActivatedRoute,
    private cannabisService: CannabisReportsService
  ) { }

  ngOnInit() {
    const strain: Observable<any> =
      this.route.params
        .map(params => params['ucpc'])
        .mergeMap(ucpc => this.cannabisService.getStrainDetails(ucpc));

    strain.subscribe((strainModel: Strain) => {
      this.selectedStrain = strainModel;
      console.log(this.selectedStrain);
    });
  }

}
