import {Injectable} from '@angular/core';
import {Product} from './product';
import {FakeProducts} from './fake-products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsKey = 'products';

  products: Product[];

  constructor() {
    const products = localStorage.getItem(this.productsKey);
    if (products) {
      this.products = JSON.parse(products);
    } else {
      this.products = new FakeProducts().products;
    }
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(product: Product): Product {
    return this.products.find(item => item.name === product.name);
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.saveInLocalStorage();
  }

  deleteProduct(product: Product) {
    const index = this.products.findIndex(item => item.name === product.name);
    if (index >= 0) {
      this.products.splice(index, 1);
    }
    this.saveInLocalStorage();
  }

  private saveInLocalStorage() {
    localStorage.setItem(this.productsKey, JSON.stringify(this.products));
  }

}
