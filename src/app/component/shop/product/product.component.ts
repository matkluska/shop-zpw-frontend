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

  constructor() {
  }

  ngOnInit() {
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
