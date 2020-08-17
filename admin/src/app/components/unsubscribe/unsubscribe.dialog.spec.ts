import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeDialog } from './unsubscribe.dialog';

describe('UnsubscribeDialog', () => {
  let component: UnsubscribeDialog;
  let fixture: ComponentFixture<UnsubscribeDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsubscribeDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubscribeDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
