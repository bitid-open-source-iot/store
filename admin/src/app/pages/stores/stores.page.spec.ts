import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresPage } from './stores.page';

describe('StoresPage', () => {
  let component: StoresPage;
  let fixture: ComponentFixture<StoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoresPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
