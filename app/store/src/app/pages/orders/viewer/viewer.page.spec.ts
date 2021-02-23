import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersViewerPage } from './viewer.page';

describe('OrdersViewerPage', () => {
  let component: OrdersViewerPage;
  let fixture: ComponentFixture<OrdersViewerPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersViewerPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersViewerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
