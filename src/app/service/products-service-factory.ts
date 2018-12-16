import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';
import {configuration} from '../../environments/config';
import {ProductsService} from './products-service';
import {ProductsFirebaseImplService} from './firebase/products-firebase-impl.service';
import {ProductsRestImplService} from './rest/products-rest-impl.service';

export function ProductsServiceFactory(firestore: AngularFirestore, http: HttpClient): ProductsService {
  if (configuration.backend === 'rest') {
    return new ProductsRestImplService(http);
  } else {
    return new ProductsFirebaseImplService(firestore);
  }
}
