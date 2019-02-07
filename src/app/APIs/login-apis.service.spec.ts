import { TestBed } from '@angular/core/testing';

import { LoginAPIsService } from './login-apis.service';

describe('LoginAPIsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginAPIsService = TestBed.get(LoginAPIsService);
    expect(service).toBeTruthy();
  });
});
