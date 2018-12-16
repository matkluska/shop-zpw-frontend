import {Component, OnInit} from '@angular/core';
import {Product} from '../../../model/product';
import {Category} from '../../../model/category';
import {CategoriesService} from '../../../service/categories-service';
import {CategoriesServiceFactory} from '../../../service/categories-service-factory';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';
import {ProductsService} from '../../../service/products-service';
import {ProductsServiceFactory} from '../../../service/products-service-factory';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
  providers: [
    {
      provide: ProductsService,
      useFactory: ProductsServiceFactory,
      deps: [AngularFirestore, HttpClient]
    },
    {
      provide: CategoriesService,
      useFactory: CategoriesServiceFactory,
      deps: [AngularFirestore, HttpClient]
    }]
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
