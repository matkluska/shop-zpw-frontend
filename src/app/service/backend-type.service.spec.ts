import { TestBed } from '@angular/core/testing';

import { BackendTypeService } from './backend-type.service';

describe('BackendTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BackendTypeService = TestBed.get(BackendTypeService);
    expect(service).toBeTruthy();
  });
});
