import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../../model/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() deleteProductFromShoppingCartEvent = new EventEmitter<Product>();
  @Output() addProductToShoppingCartEvent = new EventEmitter<Product>();

  private isDiscounted = false;
  private discountedPrice = 0;

  constructor() {
  }

  ngOnInit() {
    if (this.product.discount_end_time > Date.now() && this.product.discount_percent > 0) {
      this.discountedPrice = this.product.price * (100 - this.product.discount_percent) / 100;
      this.isDiscounted = true;
    } else {
      this.isDiscounted = false;
    }
  }

  deleteProductFromShoppingCart(product: Product) {
    product.products_quantity++;
    this.deleteProductFromShoppingCartEvent.emit(product);
  }

  addProductToShoppingCart(product: Product) {
    product.products_quantity--;
    if (!this.isDiscounted) {
      this.addProductToShoppingCartEvent.emit(product);
    } else {
      const value = {...product, price: this.discountedPrice};
      console.log(value);
      this.addProductToShoppingCartEvent.emit(value);
    }
  }
}
