import {Component, OnInit} from '@angular/core';
import {OrderService} from '../order.service';
import {Order} from '../order';
import {Guid} from '../guid';
import {ShoppingCartServiceService} from '../shopping-cart-service.service';
import {NavigationExtras, Router} from '@angular/router';
import {ProductsService} from '../products.service';
import {AuthService} from '../auth.service';
import {Product} from '../product';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [OrderService, ShoppingCartServiceService, ProductsService, AuthService]
})
export class OrderComponent implements OnInit {

  private firstName: string;
  private lastName: string;
  private city: string;
  private street: string;
  private postalCode: string;

  constructor(private orderService: OrderService, private shoppingCartService: ShoppingCartServiceService,
              private productsService: ProductsService, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const guid = Guid.random();
    const orderedProducts = new Map(this.shoppingCartService.getItems());
    const order = new Order(guid, this.authService.user.email, this.firstName, this.lastName, this.city, this.street, this.postalCode,
      Array.from(orderedProducts.values()), this.calcTotalValue(Array.from(orderedProducts.values())));
    this.orderService.addOrder(order);
    this.shoppingCartService.clear();
    this.productsService.updateProductsQuantity(orderedProducts);

    const navigationExtras: NavigationExtras = {
      queryParams: {'order_id': guid}
    };
    this.router.navigate(['/'], navigationExtras);
  }

  private calcTotalValue(products: Product[]): number {
    let totalValue = 0;
    products.forEach(product => totalValue += product.products_quantity * product.price);
    return totalValue;
  }
}
