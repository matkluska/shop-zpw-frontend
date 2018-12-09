import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductsService} from '../products.service';
import {Product} from '../product';
import {Category} from '../category';
import {CategoriesService} from '../categories.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
  providers: [ProductsService, CategoriesService]
})
export class EditProductComponent implements OnInit {
  private product: Product = new Product('', '', 0, 0, '', '', 'other');
  private categories: Category[] = [];


  constructor(private productsService: ProductsService, private categoriesService: CategoriesService, private route: ActivatedRoute) {
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
