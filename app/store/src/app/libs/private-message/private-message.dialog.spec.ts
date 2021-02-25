import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateMessageDialog } from './private-message.dialog';

describe('PrivateMessageDialog', () => {
  let component: PrivateMessageDialog;
  let fixture: ComponentFixture<PrivateMessageDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrivateMessageDialog]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateMessageDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
