import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../model/category';

@Injectable()
export abstract class CategoriesService {
  abstract getCategories(): Observable<Category[]>;
}
