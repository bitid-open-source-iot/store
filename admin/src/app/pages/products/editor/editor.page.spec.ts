import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsEditorPage } from './editor.page';

describe('ProductsEditorPage', () => {
  let component: ProductsEditorPage;
  let fixture: ComponentFixture<ProductsEditorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsEditorPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
