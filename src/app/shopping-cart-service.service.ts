import {Injectable} from '@angular/core';
import {Product} from './product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartServiceService {
  private shoppingCartKey = 'shopping-cart';

  private readonly shoppingCartItems = new Map<string, Product>();

  constructor() {
    const products = localStorage.getItem(this.shoppingCartKey);
    if (products) {
      this.shoppingCartItems = new Map<string, Product>(JSON.parse(products));
    }
  }

  getItems(): Map<string, Product> {
    return this.shoppingCartItems;
  }

  addProduct(product: Product) {
    if (this.shoppingCartItems.has(product.id)) {
      const oldProduct = this.shoppingCartItems.get(product.id);
      this.shoppingCartItems.set(product.id, {...oldProduct, products_quantity: oldProduct.products_quantity + 1});
    } else {
      this.shoppingCartItems.set(product.id, {...product, products_quantity: 1});

    }
    this.saveInLocalStorage();
  }

  deleteProduct(product: Product) {
    const productOpt = this.shoppingCartItems.get(product.id);
    if (productOpt && productOpt.products_quantity > 1) {
      const oldProduct = this.shoppingCartItems.get(product.id);
      this.shoppingCartItems.set(product.id, {...oldProduct, products_quantity: oldProduct.products_quantity - 1});
    } else if (productOpt && productOpt.products_quantity === 1) {
      this.shoppingCartItems.delete(product.id);
    }
    this.saveInLocalStorage();
  }

  getTotalValue(): number {
    let totalValue = 0;
    this.shoppingCartItems.forEach(v => totalValue += v.products_quantity * v.price);
    return totalValue;
  }

  clear() {
    this.shoppingCartItems.clear();
    this.saveInLocalStorage();
  }

  private saveInLocalStorage() {
    localStorage.setItem(this.shoppingCartKey, JSON.stringify(Array.from(this.shoppingCartItems.entries())));
  }
}
