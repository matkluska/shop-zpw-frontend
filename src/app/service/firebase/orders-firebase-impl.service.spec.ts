import { TestBed } from '@angular/core/testing';

import { OrdersFirebaseImplService } from './orders-firebase-impl.service';

describe('OrdersFirebaseImplService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersFirebaseImplService = TestBed.get(OrdersFirebaseImplService);
    expect(service).toBeTruthy();
  });
});
