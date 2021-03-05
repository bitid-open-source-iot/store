import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersFilterDialog } from './filter.dialog';

describe('CustomersFilterDialog', () => {
  let component: CustomersFilterDialog;
  let fixture: ComponentFixture<CustomersFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersFilterDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
