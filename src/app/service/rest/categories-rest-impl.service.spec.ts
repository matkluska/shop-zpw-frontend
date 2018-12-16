import { TestBed } from '@angular/core/testing';

import { CategoriesRestImplService } from './categories-rest-impl.service';

describe('CategoriesRestImplService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesRestImplService = TestBed.get(CategoriesRestImplService);
    expect(service).toBeTruthy();
  });
});
