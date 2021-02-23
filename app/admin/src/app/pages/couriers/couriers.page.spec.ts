import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouriersPage } from './couriers.page';

describe('CouriersPage', () => {
  let component: CouriersPage;
  let fixture: ComponentFixture<CouriersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouriersPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouriersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
