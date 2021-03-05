import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewsFilterDialog } from './filter.dialog';

describe('ReviewsFilterDialog', () => {
  let component: ReviewsFilterDialog;
  let fixture: ComponentFixture<ReviewsFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewsFilterDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewsFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
