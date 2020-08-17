import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreEditorPage } from './editor.page';

describe('StoreEditorPage', () => {
  let component: StoreEditorPage;
  let fixture: ComponentFixture<StoreEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreEditorPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
