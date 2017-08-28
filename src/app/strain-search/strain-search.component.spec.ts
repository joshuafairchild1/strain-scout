import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrainSearchComponent } from './strain-search.component';

describe('StrainSearchComponent', () => {
  let component: StrainSearchComponent;
  let fixture: ComponentFixture<StrainSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrainSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrainSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
