import {CategoriesService} from './categories-service';
import {CategoriesFirebaseImplService} from './firebase/categories-firebase-impl.service';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';
import {CategoriesRestImplService} from './rest/categories-rest-impl.service';
import {configuration} from '../../environments/config';


export function CategoriesServiceFactory(firestore: AngularFirestore, http: HttpClient): CategoriesService {
  if (configuration.backend === 'rest') {
    return new CategoriesRestImplService(http);
  } else {
    return new CategoriesFirebaseImplService(firestore);
  }
}
