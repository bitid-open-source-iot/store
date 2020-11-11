import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportPage } from './sales.page';

describe('SalesReportPage', () => {
  let component: SalesReportPage;
  let fixture: ComponentFixture<SalesReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReportPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
