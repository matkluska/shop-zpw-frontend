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

  constructor() {
  }

  ngOnInit() {
  }

  deleteProduct(product: Product) {
    this.deleteProductEvent.emit(product);
  }

}
