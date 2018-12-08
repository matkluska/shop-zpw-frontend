import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {Order} from '../order';
import {Guid} from '../guid';
import {ShoppingCartServiceService} from '../shopping-cart-service.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrderService, ShoppingCartServiceService]
})
export class OrderComponent implements OnInit {

  private firstName: string;
  private lastName: string;
  private city: string;
  private street: string;
  private postalCode: string;

  constructor(private orderService: OrderService, private shoppingCartService: ShoppingCartServiceService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const guid = Guid.random();
    const order = new Order(guid, this.firstName, this.lastName, this.city, this.street, this.postalCode,
      Array.from(this.shoppingCartService.getItems().values()));
    this.orderService.addOrder(order);
    // this.shoppingCartService.clear();

    const navigationExtras: NavigationExtras = {
      queryParams: {'order_id': guid}
    };
    this.router.navigate(['/'], navigationExtras);
  }
}
