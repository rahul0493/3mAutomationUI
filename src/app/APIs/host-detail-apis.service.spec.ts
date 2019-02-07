import { TestBed } from '@angular/core/testing';

import { HostDetailAPIsService } from './host-detail-apis.service';

describe('HostDetailAPIsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HostDetailAPIsService = TestBed.get(HostDetailAPIsService);
    expect(service).toBeTruthy();
  });
});
