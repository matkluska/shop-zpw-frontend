import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';
import {configuration} from '../../environments/config';
import {OrdersService} from './orders-service';
import {OrdersFirebaseImplService} from './firebase/orders-firebase-impl.service';
import {OrdersRestImplService} from './rest/orders-rest-impl.service';

export function OrdersServiceFactory(firestore: AngularFirestore, http: HttpClient): OrdersService {
  if (configuration.backend === 'rest') {
    return new OrdersRestImplService(http);
  } else {
    return new OrdersFirebaseImplService(firestore);
  }
}
