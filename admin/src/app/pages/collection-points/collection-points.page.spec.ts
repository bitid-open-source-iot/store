import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectionPointsPage } from './collection-points.page';

describe('CollectionPointsPage', () => {
  let component: CollectionPointsPage;
  let fixture: ComponentFixture<CollectionPointsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CollectionPointsPage]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectionPointsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
