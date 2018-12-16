import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../model/product';
import {take} from 'rxjs/operators';

@Injectable()
export abstract class ProductsService {
  abstract getProducts(): Observable<Product[]>;

  abstract getProduct(productId: string): Observable<Product>;

  abstract addProduct(product: Product): Promise<any>;

  abstract deleteProduct(product: Product): Promise<any>;

  abstract updateProduct(product: Product): Promise<any>;

  updateProductsQuantity(orderedProducts: Map<string, Product>): void {
    this.getProducts().pipe(take(1)).subscribe((products) => {
      products.forEach(product => {
        const orderedProduct = orderedProducts.get(product.id);
        if (orderedProducts.has(product.id)) {
          product.products_quantity = product.products_quantity - orderedProduct.products_quantity;
          this.updateProduct(product);
        }
      });
    });
  }
}
