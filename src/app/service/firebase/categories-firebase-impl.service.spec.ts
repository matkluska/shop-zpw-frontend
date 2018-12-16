import { TestBed } from '@angular/core/testing';

import { CategoriesFirebaseImplService } from './categories-firebase-impl.service';

describe('CategoriesFirebaseImplService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoriesFirebaseImplService = TestBed.get(CategoriesFirebaseImplService);
    expect(service).toBeTruthy();
  });
});
