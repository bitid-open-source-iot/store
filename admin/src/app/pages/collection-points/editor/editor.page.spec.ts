import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPointsEditorPage } from './editor.page';

describe('CollectionPointsEditorPage', () => {
  let component: CollectionPointsEditorPage;
  let fixture: ComponentFixture<CollectionPointsEditorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionPointsEditorPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPointsEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
