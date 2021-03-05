import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPointsFilterDialog } from './filter.dialog';

describe('CollectionPointsFilterDialog', () => {
  let component: CollectionPointsFilterDialog;
  let fixture: ComponentFixture<CollectionPointsFilterDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectionPointsFilterDialog ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPointsFilterDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
