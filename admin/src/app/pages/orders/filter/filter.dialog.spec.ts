import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersFilterDialog } from './filter.dialog';

describe('OrdersFilterDialog', () => {
  let component: OrdersFilterDialog;
  let fixture: ComponentFixture<OrdersFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersFilterDialog]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
