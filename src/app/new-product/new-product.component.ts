import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  providers: [ProductsService]
})
export class NewProductComponent implements OnInit {

  model = new Product('', 0, 0, '', '');


  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    // this.submitted = true;
    this.productsService.addProduct(this.model);
  }

  // addProduct(name: string, products_quantity: number, price: number, description: string, photo_url: string) {
  //   const product = new Product();
  //   product.name = name;
  //   product.products_quantity = products_quantity;
  //   product.price = price;
  //   product.photo_url = photo_url;
  //   this.productsService.addProduct(product);
  // }

}
