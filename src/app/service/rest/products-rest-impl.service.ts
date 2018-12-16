import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductsService} from '../products-service';
import {Product} from '../../model/product';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsRestImplService extends ProductsService {

  constructor(private http: HttpClient) {
    super();
  }

  addProduct(product: Product): Promise<any> {
    return this.http.post<Product>(`${environment.apiRoot}/products`, product).toPromise();
  }

  deleteProduct(product: Product): Promise<any> {
    return this.http.delete(`${environment.apiRoot}/products/${product.id}`).toPromise();
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiRoot}/products/${productId}`);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.apiRoot}/products`);
  }

  updateProduct(product: Product): Promise<any> {
    return this.http.put<void>(`${environment.apiRoot}/products/${product.id}`, product).toPromise();
  }
}
