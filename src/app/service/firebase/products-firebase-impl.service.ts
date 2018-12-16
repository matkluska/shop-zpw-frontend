import {Injectable} from '@angular/core';
import {Product} from '../../model/product';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ProductsService} from '../products-service';

@Injectable({
  providedIn: 'root'
})
export class ProductsFirebaseImplService extends ProductsService {
  private productsCollection: AngularFirestoreCollection<Product>;

  constructor(private firestore: AngularFirestore) {
    super();
    this.productsCollection = firestore.collection('/products');
  }

  getProducts(): Observable<Product[]> {
    return this.productsCollection.snapshotChanges().pipe(map(data => {
      return data.map(p => {
        const product = p.payload.doc.data() as Product;
        product.id = p.payload.doc.id;
        return product;
      });
    }));
  }

  getProduct(productId: string): Observable<Product> {
    return this.firestore.doc<Product>(`/products/${productId}`).valueChanges();
  }

  addProduct(product: Product): Promise<any> {
    return this.productsCollection.add({...product});
  }

  deleteProduct(product: Product): Promise<any> {
    return this.productsCollection.doc(product.id).delete();
  }

  updateProduct(product: Product): Promise<any> {
    return this.productsCollection.doc(product.id).update({...product});
  }
}
