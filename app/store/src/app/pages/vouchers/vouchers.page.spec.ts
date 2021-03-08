import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersPage } from './vouchers.page';

describe('VouchersPage', () => {
  let component: VouchersPage;
  let fixture: ComponentFixture<VouchersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VouchersPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
