import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsFilterDialog } from './filter.dialog';

describe('DepartmentsFilterDialog', () => {
  let component: DepartmentsFilterDialog;
  let fixture: ComponentFixture<DepartmentsFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartmentsFilterDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
