import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OrdersService} from '../orders-service';
import {Order} from '../../model/order';
import {Observable} from 'rxjs';
import {Category} from '../../model/category';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersRestImplService implements OrdersService {

  constructor(private http: HttpClient) {
  }

  addOrder(order: Order): Promise<any> {
    return this.http.post<Category>(`${environment.apiRoot}/orders`, order).toPromise();
  }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${environment.apiRoot}/orders`);
  }

  updateOrder(order: Order): Promise<any> {
    return this.http.put<void>(`${environment.apiRoot}/orders/${order.id}`, order).toPromise();
  }
}
