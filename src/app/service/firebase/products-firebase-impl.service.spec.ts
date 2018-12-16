import { TestBed } from '@angular/core/testing';

import { ProductsFirebaseImplService } from './products-firebase-impl.service';

describe('ProductsFirebaseImplService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductsFirebaseImplService = TestBed.get(ProductsFirebaseImplService);
    expect(service).toBeTruthy();
  });
});
