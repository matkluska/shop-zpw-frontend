import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {Order, OrderState} from '../order';

@Component({
  selector: 'app-management-orders',
  templateUrl: './management-orders.component.html',
  styleUrls: ['./management-orders.component.css'],
  providers: [OrderService]
})
export class ManagementOrdersComponent implements OnInit {

  private orders: Order[] = [];
  private orderState = OrderState;

  constructor(private orderService: OrderService) {
  }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe((data) => this.orders = data);
  }

  toRealization(order: Order) {
    this.orderService.updateOrder({...order, state: OrderState.IN_REALIZATION});
  }

  shipped(order: Order) {
    this.orderService.updateOrder({...order, state: OrderState.SHIPPED, shippingTime: new Date()});
  }

  updateOrder(order: Order) {
    this.orderService.updateOrder(order);
  }

  private isReadyToShip(order: Order): boolean {
    return order.products.every(product => product.is_ready);
  }
}
