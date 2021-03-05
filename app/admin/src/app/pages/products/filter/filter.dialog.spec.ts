import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsFilterDialog } from './filter.dialog';

describe('ProductsFilterDialog', () => {
  let component: ProductsFilterDialog;
  let fixture: ComponentFixture<ProductsFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsFilterDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
