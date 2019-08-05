import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideStatusPage } from './ride-status.page';

describe('RideStatusPage', () => {
  let component: RideStatusPage;
  let fixture: ComponentFixture<RideStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RideStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RideStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
