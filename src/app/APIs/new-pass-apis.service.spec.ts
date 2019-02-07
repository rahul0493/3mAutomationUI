import { TestBed } from '@angular/core/testing';

import { NewPassAPIsService } from './new-pass-apis.service';

describe('NewPassAPIsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewPassAPIsService = TestBed.get(NewPassAPIsService);
    expect(service).toBeTruthy();
  });
});
