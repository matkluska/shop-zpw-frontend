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

  model = new Product(this.guid(), '', 0, 0, '', '', 'Other');


  constructor(private productsService: ProductsService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.productsService.addProduct(this.model);
  }

  private guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }
}
