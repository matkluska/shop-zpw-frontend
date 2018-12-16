import {Injectable} from '@angular/core';
import {Order} from '../../model/order';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {OrdersService} from '../orders-service';

@Injectable({
  providedIn: 'root'
})
export class OrdersFirebaseImplService implements OrdersService {
  private ordersCollection: AngularFirestoreCollection<Order>;

  constructor(private firestore: AngularFirestore) {
    this.ordersCollection = firestore.collection('/orders');
  }

  getAllOrders(): Observable<Order[]> {
    return this.ordersCollection.snapshotChanges()
      .pipe(map(data => {
        return data
          .map(o => {
            const order = o.payload.doc.data() as Order;
            order.id = o.payload.doc.id;
            return order;
          });
      }));
  }

  // getOrders(email: string): Observable<Order[]> {
  //   return this.ordersCollection.snapshotChanges()
  //     .pipe(map(data => {
  //       return data
  //         .filter(o => o.payload.doc.data().email === email)
  //         .map(o => {
  //           const order = o.payload.doc.data() as Order;
  //           order.id = o.payload.doc.id;
  //           return order;
  //         });
  //     }));
  // }

  addOrder(order: Order): Promise<any> {
    return this.ordersCollection.add({...order});
  }

  updateOrder(order: Order): Promise<any> {
    return this.ordersCollection.doc(order.id).update({...order});
  }
}
