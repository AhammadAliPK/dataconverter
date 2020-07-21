import { TestBed } from '@angular/core/testing';

import { ApiserviceService } from './api.service';

describe('ApiserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiserviceService = TestBed.get(ApiserviceService);
    expect(service).toBeTruthy();
  });
});
