import { TestBed, inject } from '@angular/core/testing';

import { CannabisReportsService } from './cannabis-reports.service';

describe('CannabisReportsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CannabisReportsService]
    });
  });

  it('should ...', inject([CannabisReportsService], (service: CannabisReportsService) => {
    expect(service).toBeTruthy();
  }));
});
