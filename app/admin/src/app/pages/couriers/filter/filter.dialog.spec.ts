import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouriersFilterDialog } from './filter.dialog';

describe('CouriersFilterDialog', () => {
  let component: CouriersFilterDialog;
  let fixture: ComponentFixture<CouriersFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CouriersFilterDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouriersFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
