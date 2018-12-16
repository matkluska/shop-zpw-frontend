import { TestBed } from '@angular/core/testing';

import { ProductsRestImplService } from './products-rest-impl.service';

describe('ProductsRestImplService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsRestImplService = TestBed.get(ProductsRestImplService);
    expect(service).toBeTruthy();
  });
});
