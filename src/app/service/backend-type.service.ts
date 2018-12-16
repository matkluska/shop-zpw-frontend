import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map, take} from 'rxjs/operators';
import {Config} from '../model/config';

@Injectable({
  providedIn: 'root'
})
export class BackendTypeService {
  private configCollection: AngularFirestoreCollection<Config>;

  constructor(private firestore: AngularFirestore) {
    this.configCollection = firestore.collection('/config');
  }

  getConfig(): Observable<Config> {
    return this.configCollection.snapshotChanges()
      .pipe(take(1))
      .pipe(map(data => {
        return data
          .map(c => {
              const config = c.payload.doc.data() as Config;
              config.id = c.payload.doc.id;
              return config;
            }
          )[0];
      }));
  }

  updateConfig(config: Config): Promise<any> {
    return this.configCollection.doc(config.id).update({...config});
  }
}
