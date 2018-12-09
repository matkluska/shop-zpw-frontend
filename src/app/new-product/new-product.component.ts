import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {ProductsService} from '../products.service';
import {CategoriesService} from '../categories.service';
import {Category} from '../category';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  providers: [ProductsService, CategoriesService]
})
export class NewProductComponent implements OnInit {

  private model = new Product('', '', 0, 0, '', '', 'other');
  private categories: Category[] = [];


  constructor(private productsService: ProductsService, private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
  }

  onSubmit() {
    this.productsService.addProduct(this.model);
  }

}
