import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  @Output() deleteProductEvent = new EventEmitter<Product>();
  @Output() deleteProductFromShoppingCartEvent = new EventEmitter<Product>();
  @Output() addProductToShoppingCartEvent = new EventEmitter<Product>();

  constructor() {
  }

  ngOnInit() {
  }

  deleteProduct(product: Product) {
    this.deleteProductEvent.emit(product);
  }

  deleteProductFromShoppingCart(product: Product) {
    product.products_quantity++;
    this.deleteProductFromShoppingCartEvent.emit(product);
  }

  addProductToShoppingCart(product: Product) {
    product.products_quantity--;
    this.addProductToShoppingCartEvent.emit(product);
  }
}
