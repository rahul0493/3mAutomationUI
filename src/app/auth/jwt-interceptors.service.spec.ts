import { TestBed } from '@angular/core/testing';

import { JwtInterceptorsService } from './jwt-interceptors.service';

describe('JwtInterceptorsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JwtInterceptorsService = TestBed.get(JwtInterceptorsService);
    expect(service).toBeTruthy();
  });
});
