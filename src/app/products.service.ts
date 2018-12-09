import {Injectable} from '@angular/core';
import {Product} from './product';
import {FakeProducts} from './fake-products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsKey = 'products';

  private readonly products: Product[];

  constructor() {
    const products = localStorage.getItem(this.productsKey);
    if (products) {
      const parsedProducts = JSON.parse(products);
      if (parsedProducts.length > 0) {
        this.products = parsedProducts;
        return;
      }
    }
    this.products = new FakeProducts().products;
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(product: Product): Product {
    return this.products.find(item => item.id === product.id);
  }

  addProduct(product: Product) {
    this.products.push(product);
    this.saveInLocalStorage();
  }

  deleteProduct(product: Product) {
    const index = this.products.findIndex(item => item.id === product.id);
    if (index >= 0) {
      this.products.splice(index, 1);
    }
    this.saveInLocalStorage();
  }

  private saveInLocalStorage() {
    localStorage.setItem(this.productsKey, JSON.stringify(this.products));
  }

  updateProductsQuantity(orderedProducts: Map<string, Product>) {
    this.products.forEach(product => {
      const orderedProduct = orderedProducts.get(product.id);
      if (orderedProducts.has(product.id)) {
        product.products_quantity = product.products_quantity - orderedProduct.products_quantity;
      }
    });
    this.saveInLocalStorage();
  }
}
