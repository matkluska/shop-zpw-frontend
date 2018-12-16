import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Product} from '../../../model/product';
import {ShoppingCartServiceService} from '../../../service/shopping-cart-service.service';
import {Category} from '../../../model/category';
import {PriceRange} from '../../../model/price-range';
import {ProductsService} from '../../../service/products-service';
import {ProductsServiceFactory} from '../../../service/products-service-factory';
import {AngularFirestore} from '@angular/fire/firestore';
import {SocketService} from '../../../service/socket.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [
    {
      provide: ProductsService,
      useFactory: ProductsServiceFactory,
      deps: [AngularFirestore, HttpClient]
    },
    ShoppingCartServiceService,
    SocketService
  ]
})
export class ProductsComponent implements OnInit {

  private products: Product[] = [];
  private checkedCategories: Category[] = [];
  private priceRange = new PriceRange(0, Number.MAX_SAFE_INTEGER);
  currentPageNumber = 0;

  constructor(private productsService: ProductsService, private shoppingCartService: ShoppingCartServiceService,
              private socketService: SocketService) {
  }

  ngOnInit() {
    this.productsService.getProducts()
      .subscribe((data) => this.products = data);

    this.socketService.onTimeDiscount().subscribe(() => {
      this.productsService.getProducts()
        .subscribe((data) => this.products = data);
    });

    this.socketService.onEndDiscount().subscribe((productId) => {
      this.productsService.getProduct(productId)
        .subscribe((product) => {
          this.productsService.updateProduct({...product, discount_percent: 0, discount_end_time: 0}).then(() =>
            this.productsService.getProducts()
              .subscribe((data) => {
                this.products = data;
              }))
          ;
        });
    });
  }

  onAddToShoppingCart(product: Product) {
    this.shoppingCartService.addProduct(product);
  }

  onDeleteFromShoppingCart(product: Product) {
    this.shoppingCartService.deleteProduct(product);
  }

  onCheckedCategories(categories: Category[]) {
    this.checkedCategories = categories;
  }

  onPriceRangeChange(priceRange: PriceRange) {
    this.priceRange = priceRange;
  }

  pageChanged($event: number) {
    this.currentPageNumber = $event;
  }
}
