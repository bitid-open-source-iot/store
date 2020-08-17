import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiEditorPage } from './editor.page';

describe('ApiEditorPage', () => {
  let component: ApiEditorPage;
  let fixture: ComponentFixture<ApiEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiEditorPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
