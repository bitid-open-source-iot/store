import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGalleryDialog } from './gallery.dialog';

describe('ProductGalleryDialog', () => {
  let component: ProductGalleryDialog;
  let fixture: ComponentFixture<ProductGalleryDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductGalleryDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductGalleryDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
