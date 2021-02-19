import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentsEditorPage } from './editor.page';

describe('DepartmentsEditorPage', () => {
  let component: DepartmentsEditorPage;
  let fixture: ComponentFixture<DepartmentsEditorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentsEditorPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentsEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
