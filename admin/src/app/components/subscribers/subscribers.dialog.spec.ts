import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribersDialog } from './subscribers.dialog';

describe('SubscribersDialog', () => {
  let component: SubscribersDialog;
  let fixture: ComponentFixture<SubscribersDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribersDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribersDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
