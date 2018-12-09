import {Injectable} from '@angular/core';
import {Order} from './order';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private ordersCollection: AngularFirestoreCollection<Order>;

  constructor(private firestore: AngularFirestore) {
    this.ordersCollection = firestore.collection('/orders');
  }

  getOrders(userId: string): Observable<Order[]> {
    return this.ordersCollection.snapshotChanges()
      .pipe(map(data => {
        return data
          .filter(o => o.payload.doc.data().userId === userId)
          .map(o => {
            const order = o.payload.doc.data() as Order;
            order.id = o.payload.doc.id;
            return order;
          });
      }));
  }


  addOrder(order: Order) {
    this.ordersCollection.add({...order});
  }
}
