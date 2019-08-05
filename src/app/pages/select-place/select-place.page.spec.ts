import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlacePage } from './select-place.page';

describe('SelectPlacePage', () => {
  let component: SelectPlacePage;
  let fixture: ComponentFixture<SelectPlacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPlacePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPlacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
