import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentEditorPage } from './editor.page';

describe('DepartmentEditorPage', () => {
  let component: DepartmentEditorPage;
  let fixture: ComponentFixture<DepartmentEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepartmentEditorPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
