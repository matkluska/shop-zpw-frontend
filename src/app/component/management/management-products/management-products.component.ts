import {Component, OnInit} from '@angular/core';
import {Product} from '../../../model/product';
import {NavigationExtras, Router} from '@angular/router';
import {ProductsService} from '../../../service/products-service';
import {ProductsServiceFactory} from '../../../service/products-service-factory';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-management-products',
  templateUrl: './management-products.component.html',
  styleUrls: ['./management-products.component.css'],
  providers: [{
    provide: ProductsService,
    useFactory: ProductsServiceFactory,
    deps: [AngularFirestore, HttpClient]
  }]
})
export class ManagementProductsComponent implements OnInit {

  private products: Product[] = [];

  constructor(private productsService: ProductsService, private router: Router) {
  }

  ngOnInit() {
    this.productsService.getProducts()
      .subscribe((data) => this.products = data);
  }

  deleteProduct(product: Product) {
    this.productsService.deleteProduct(product).then(
      () => this.productsService.getProducts()
        .subscribe((data) => this.products = data));

  }

  editProductRedirect(productId: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {'product_id': productId}
    };
    this.router.navigate(['/admin/edit-product'], navigationExtras);
  }

  timeDiscountRedirect(productId: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {'product_id': productId}
    };
    this.router.navigate(['/admin/time-discount'], navigationExtras);
  }
}
