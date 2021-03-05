import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersFilterDialog } from './filter.dialog';

describe('SuppliersFilterDialog', () => {
  let component: SuppliersFilterDialog;
  let fixture: ComponentFixture<SuppliersFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuppliersFilterDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
