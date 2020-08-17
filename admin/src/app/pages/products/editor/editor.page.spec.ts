import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditorPage } from './editor.page';

describe('ProductEditorPage', () => {
  let component: ProductEditorPage;
  let fixture: ComponentFixture<ProductEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEditorPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
