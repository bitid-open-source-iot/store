import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouriersEditorPage } from './editor.page';

describe('CouriersEditorPage', () => {
  let component: CouriersEditorPage;
  let fixture: ComponentFixture<CouriersEditorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CouriersEditorPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CouriersEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
