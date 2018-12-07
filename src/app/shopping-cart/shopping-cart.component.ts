import {Component, OnInit} from '@angular/core';
import {ShoppingCartServiceService} from '../shopping-cart-service.service';
import {Product} from '../product';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [ShoppingCartServiceService]
})
export class ShoppingCartComponent implements OnInit {

  cartItems: Map<string, Product> = new Map<string, Product>();

  constructor(private shoppingCartService: ShoppingCartServiceService) {
  }

  ngOnInit() {
    this.cartItems = this.shoppingCartService.getItems();
  }

  addProductToShoppingCart(product: Product) {
    this.shoppingCartService.addProduct(product);
  }

  deleteProductFromShoppingCart(product: Product) {
    this.shoppingCartService.deleteProduct(product);
  }

  getTotalValue(): number {
    return this.shoppingCartService.getTotalValue();
  }

}
