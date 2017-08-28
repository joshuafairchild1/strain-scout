import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrainDetailsComponent } from './strain-details.component';

describe('StrainDetailsComponent', () => {
  let component: StrainDetailsComponent;
  let fixture: ComponentFixture<StrainDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrainDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
