import {Injectable} from '@angular/core';
import {Category} from './category';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private categoriesCollection: AngularFirestoreCollection<Category>;

  constructor(private firestore: AngularFirestore) {
    this.categoriesCollection = firestore.collection('/categories');
  }

  getCategories(): Observable<Category[]> {
    return this.categoriesCollection.snapshotChanges()
      .pipe(map(data => {
        return data
          .map(c => {
            const category = c.payload.doc.data() as Category;
            category.id = c.payload.doc.id;
            return category;
          });
      }));
  }
}
