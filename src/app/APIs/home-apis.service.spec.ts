import { TestBed } from '@angular/core/testing';

import { HomeAPIsService } from './home-apis.service';

describe('HomeAPIsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeAPIsService = TestBed.get(HomeAPIsService);
    expect(service).toBeTruthy();
  });
});
