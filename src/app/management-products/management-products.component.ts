import {Component, OnInit} from '@angular/core';
import {Product} from '../product';
import {ProductsService} from '../products.service';
import {NavigationExtras, Router} from '@angular/router';

@Component({
  selector: 'app-management-products',
  templateUrl: './management-products.component.html',
  styleUrls: ['./management-products.component.css'],
  providers: [ProductsService]
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
    this.productsService.deleteProduct(product);
  }

  editProductRedirect(productId: string) {
    const navigationExtras: NavigationExtras = {
      queryParams: {'product_id': productId}
    };
    this.router.navigate(['/admin/edit-product'], navigationExtras);
  }
}
