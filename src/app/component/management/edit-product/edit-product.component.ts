import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../model/product';
import {Category} from '../../../model/category';
import {CategoriesService} from '../../../service/categories-service';
import {CategoriesServiceFactory} from '../../../service/categories-service-factory';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';
import {ProductsService} from '../../../service/products-service';
import {ProductsServiceFactory} from '../../../service/products-service-factory';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
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
    }
  ]
})
export class EditProductComponent implements OnInit {
  private product: Product = new Product('', '', 0, 0, '', '', 'other');
  private categories: Category[] = [];


  constructor(private productsService: ProductsService, private categoriesService: CategoriesService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const productId = params['product_id'];
      if (productId) {
        this.productsService.getProduct(productId).subscribe(product => this.product = product);
      }
    });
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
  }

  onSubmit() {
    this.productsService.updateProduct(this.product);
  }
}
