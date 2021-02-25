import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistPage } from './wishlist.page';

describe('WishlistPage', () => {
  let component: WishlistPage;
  let fixture: ComponentFixture<WishlistPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WishlistPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WishlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
