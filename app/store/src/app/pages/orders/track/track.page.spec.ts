import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersTrackPage } from './track.page';

describe('OrdersTrackPage', () => {
  let component: OrdersTrackPage;
  let fixture: ComponentFixture<OrdersTrackPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersTrackPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersTrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
