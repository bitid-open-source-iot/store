import { TestBed } from '@angular/core/testing';

import { CouriersService } from './couriers.service';

describe('CouriersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CouriersService = TestBed.get(CouriersService);
    expect(service).toBeTruthy();
  });
});
