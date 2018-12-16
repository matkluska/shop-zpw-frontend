import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Order} from '../model/order';

@Injectable()
export abstract class OrdersService {
  abstract getAllOrders(): Observable<Order[]>;

  abstract addOrder(order: Order): Promise<any>;

  abstract updateOrder(order: Order): Promise<any>;
}
