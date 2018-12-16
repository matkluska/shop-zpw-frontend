import {Component, OnInit} from '@angular/core';
import {Order} from '../../../model/order';
import {Guid} from '../../../guid';
import {ShoppingCartServiceService} from '../../../service/shopping-cart-service.service';
import {NavigationExtras, Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {Product} from '../../../model/product';
import {OrdersService} from '../../../service/orders-service';
import {OrdersServiceFactory} from '../../../service/orders-service-factory';
import {ProductsService} from '../../../service/products-service';
import {ProductsServiceFactory} from '../../../service/products-service-factory';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [
    ShoppingCartServiceService, AuthService,
    {
      provide: ProductsService,
      useFactory: ProductsServiceFactory,
      deps: [AngularFirestore, HttpClient]
    },
    {
      provide: OrdersService,
      useFactory: OrdersServiceFactory,
      deps: [AngularFirestore, HttpClient]
    }
  ]
})
export class OrderComponent implements OnInit {

  private firstName: string;
  private lastName: string;
  private city: string;
  private street: string;
  private postalCode: string;

  constructor(private orderService: OrdersService, private shoppingCartService: ShoppingCartServiceService,
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
