import {Component, OnInit} from '@angular/core';
import {Order, OrderState} from '../../../model/order';
import {OrdersService} from '../../../service/orders-service';
import {OrdersServiceFactory} from '../../../service/orders-service-factory';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-management-orders',
  templateUrl: './management-orders.component.html',
  styleUrls: ['./management-orders.component.css'],
  providers: [{
    provide: OrdersService,
    useFactory: OrdersServiceFactory,
    deps: [AngularFirestore, HttpClient]
  }]
})
export class ManagementOrdersComponent implements OnInit {

  private orders: Order[] = [];
  private orderState = OrderState;

  constructor(private orderService: OrdersService) {
  }

  ngOnInit() {
    this.orderService.getAllOrders().subscribe((data) => this.orders = data);
  }

  toRealization(order: Order) {
    this.updateOrder({...order, state: OrderState.IN_REALIZATION});
  }

  shipped(order: Order) {
    this.updateOrder({...order, state: OrderState.SHIPPED, shippingTime: new Date().getTime()});
  }

  updateOrder(order: Order) {
    this.orderService.updateOrder(order).then(() =>
      this.orderService.getAllOrders().subscribe((data) => this.orders = data)
    );
  }

  private isReadyToShip(order: Order): boolean {
    return order.products.every(product => product.is_ready);
  }
}
