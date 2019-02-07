import { TestBed } from '@angular/core/testing';

import { ResetPassAPIsService } from './reset-pass-apis.service';

describe('ResetPassAPIsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResetPassAPIsService = TestBed.get(ResetPassAPIsService);
    expect(service).toBeTruthy();
  });
});
