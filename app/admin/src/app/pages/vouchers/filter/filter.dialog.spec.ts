import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersFilterDialog } from './filter.dialog';

describe('VouchersFilterDialog', () => {
  let component: VouchersFilterDialog;
  let fixture: ComponentFixture<VouchersFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VouchersFilterDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VouchersFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
