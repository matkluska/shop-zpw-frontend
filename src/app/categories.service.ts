import {Injectable} from '@angular/core';
import {Category} from './category';
import {FakeCategories} from './fake-categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly categories: Category[];

  constructor() {
    this.categories = new FakeCategories().categories;
  }

  getCategories(): Category[] {
    return this.categories;
  }
}
