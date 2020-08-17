import { TestBed } from '@angular/core/testing';

import { CollectionPointsService } from './collection-points.service';

describe('CollectionPointsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CollectionPointsService = TestBed.get(CollectionPointsService);
    expect(service).toBeTruthy();
  });
});
