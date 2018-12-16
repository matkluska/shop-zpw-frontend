import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Product} from '../../../model/product';
import {ShoppingCartServiceService} from '../../../service/shopping-cart-service.service';
import {Category} from '../../../model/category';
import {PriceRange} from '../../../model/price-range';
import {ProductsService} from '../../../service/products-service';
import {ProductsServiceFactory} from '../../../service/products-service-factory';
import {AngularFirestore} from '@angular/fire/firestore';

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
    ShoppingCartServiceService
  ]
})
export class ProductsComponent implements OnInit {

  private products: Product[] = [];
  private checkedCategories: Category[] = [];
  private priceRange = new PriceRange(0, Number.MAX_SAFE_INTEGER);
  currentPageNumber = 0;

  constructor(private productsService: ProductsService, private shoppingCartService: ShoppingCartServiceService) {
  }

  ngOnInit() {
    this.productsService.getProducts()
      .subscribe((data) => this.products = data);
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
