import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductsService]
})
export class ProductsComponent implements OnInit {

  private products: Product[] = [];

  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

  onDeleteProduct(product: Product) {
    this.productsService.deleteProduct(product);
  }

}
