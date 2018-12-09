import {Injectable} from '@angular/core';
import {Product} from './product';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsCollection: AngularFirestoreCollection<Product>;

  constructor(private firestore: AngularFirestore) {
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

  addProduct(product: Product) {
    this.productsCollection.add({...product});
  }

  deleteProduct(product: Product) {
    this.productsCollection.doc(product.id).delete();
  }

  updateProduct(product: Product) {
    this.productsCollection.doc(product.id).update({...product});
  }

  updateProductsQuantity(orderedProducts: Map<string, Product>) {
    this.getProducts().pipe(take(1)).subscribe((products) => {
      products.forEach(product => {
        const orderedProduct = orderedProducts.get(product.id);
        if (orderedProducts.has(product.id)) {
          product.products_quantity = product.products_quantity - orderedProduct.products_quantity;
          this.updateProduct(product);
        }
      });
    });

  }
}
