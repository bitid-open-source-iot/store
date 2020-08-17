import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreButtonComponent } from './store-button.component';

describe('StoreButtonComponent', () => {
  let component: StoreButtonComponent;
  let fixture: ComponentFixture<StoreButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
