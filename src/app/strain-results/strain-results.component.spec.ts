import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrainResultsComponent } from './strain-results.component';

describe('StrainResultsComponent', () => {
  let component: StrainResultsComponent;
  let fixture: ComponentFixture<StrainResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrainResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrainResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
