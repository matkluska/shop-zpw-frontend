import { TestBed } from '@angular/core/testing';

import { OrdersRestImplService } from './orders-rest-impl.service';

describe('OrdersRestImplService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OrdersRestImplService = TestBed.get(OrdersRestImplService);
    expect(service).toBeTruthy();
  });
});
