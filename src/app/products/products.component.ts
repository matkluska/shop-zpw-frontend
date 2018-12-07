import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {ProductsService} from '../products.service';
import {ShoppingCartServiceService} from '../shopping-cart-service.service';
import {Category} from '../category';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService, ShoppingCartServiceService]
})
export class ProductsComponent implements OnInit {

  private products: Product[] = [];
  private checkedCategories: Category[] = [];
  currentPageNumber = 0;

  constructor(private productsService: ProductsService, private shoppingCartService: ShoppingCartServiceService) {
  }

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

  onDeleteProduct(product: Product) {
    this.productsService.deleteProduct(product);
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

  pageChanged($event: number) {
    this.currentPageNumber = $event;
  }
}
