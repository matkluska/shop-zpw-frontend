import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {Order} from '../order';
import {Guid} from '../guid';
import {ShoppingCartServiceService} from '../shopping-cart-service.service';
import {NavigationExtras, Router} from '@angular/router';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrderService, ShoppingCartServiceService, ProductsService]
})
export class OrderComponent implements OnInit {

  private firstName: string;
  private lastName: string;
  private city: string;
  private street: string;
  private postalCode: string;

  constructor(private orderService: OrderService, private shoppingCartService: ShoppingCartServiceService,
              private productsService: ProductsService, private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const guid = Guid.random();
    const orderedProducts = this.shoppingCartService.getItems();
    const order = new Order(guid, this.firstName, this.lastName, this.city, this.street, this.postalCode,
      Array.from(orderedProducts.values()));
    this.orderService.addOrder(order);
    this.shoppingCartService.clear();
    this.productsService.updateProductsQuantity(orderedProducts);

    const navigationExtras: NavigationExtras = {
      queryParams: {'order_id': guid}
    };
    this.router.navigate(['/'], navigationExtras);
  }
}
