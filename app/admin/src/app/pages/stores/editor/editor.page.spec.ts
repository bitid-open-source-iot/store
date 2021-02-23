import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresEditorPage } from './editor.page';

describe('StoresEditorPage', () => {
  let component: StoresEditorPage;
  let fixture: ComponentFixture<StoresEditorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StoresEditorPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
