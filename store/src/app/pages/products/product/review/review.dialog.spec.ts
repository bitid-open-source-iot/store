import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDialog } from './review.dialog';

describe('ReviewDialog', () => {
  let component: ReviewDialog;
  let fixture: ComponentFixture<ReviewDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
