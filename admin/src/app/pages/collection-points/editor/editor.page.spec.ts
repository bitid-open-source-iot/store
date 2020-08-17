import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPointEditorPage } from './editor.page';

describe('CollectionPointEditorPage', () => {
  let component: CollectionPointEditorPage;
  let fixture: ComponentFixture<CollectionPointEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollectionPointEditorPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPointEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
