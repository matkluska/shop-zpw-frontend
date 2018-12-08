import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {ProductsService} from '../products.service';
import {Guid} from '../guid';
import {CategoriesService} from '../categories.service';
import {Category} from '../category';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  providers: [ProductsService, CategoriesService]
})
export class NewProductComponent implements OnInit {

  private model = new Product(Guid.random(), '', 0, 0, '', '', 'Other');
  private categories: Category[] = [];


  constructor(private productsService: ProductsService, private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories();
  }

  onSubmit() {
    this.productsService.addProduct(this.model);
  }

}
