import {Injectable} from '@angular/core';
import {Product} from './product';
import {FakeProducts} from './fake-products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: Product[];

  constructor() {
    this.products = new FakeProducts().products;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(product: Product): Product {
    return this.products.find(item => item.name === product.name);
  }

  addProduct(product: Product) {
    this.products.concat(product);
  }

  deleteProduct(product: Product) {
    const index = this.products.findIndex(item => item.name === product.name);
    if (index >= 0) {
      this.products.splice(index, 1);
    }
  }

}
