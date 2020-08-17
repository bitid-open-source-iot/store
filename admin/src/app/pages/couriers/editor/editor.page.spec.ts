import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierEditorPage } from './editor.page';

describe('CourierEditorPage', () => {
  let component: CourierEditorPage;
  let fixture: ComponentFixture<CourierEditorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierEditorPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
