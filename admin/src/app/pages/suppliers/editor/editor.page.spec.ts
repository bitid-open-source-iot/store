import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierEditorPage } from './editor.page';

describe('SupplierEditorPage', () => {
  let component: SupplierEditorPage;
  let fixture: ComponentFixture<SupplierEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierEditorPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
