import {Injectable} from '@angular/core';
import {Order} from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersKey = 'orders';

  private orders: Map<string, Order> = new Map<string, Order>();

  constructor() {
    const orders = localStorage.getItem(this.ordersKey);
    if (orders) {
      this.orders = new Map<string, Order>(JSON.parse(orders));
    }
  }

  addOrder(order: Order) {
    this.orders.set(order.id, order);
    this.saveInLocalStorage();
  }

  getOrder(id: string): Order {
    return this.orders.get(id);
  }

  cancelOrder(id: string) {
    this.orders.delete(id);
    this.saveInLocalStorage();
  }

  private saveInLocalStorage() {
    localStorage.setItem(this.ordersKey, JSON.stringify(Array.from(this.orders.entries())));
  }
}
