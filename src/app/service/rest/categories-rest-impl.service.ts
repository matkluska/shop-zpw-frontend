import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CategoriesService} from '../categories-service';
import {Observable} from 'rxjs';
import {Category} from '../../model/category';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesRestImplService implements CategoriesService {

  constructor(private http: HttpClient) {
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiRoot}/categories`);
  }
}
