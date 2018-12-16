import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../model/product';
import {Category} from '../model/category';

@Pipe({
  name: 'categories'
})
export class CategoriesPipe implements PipeTransform {

  transform(products: Product[], categories: Category[]) {
    if (!products) {
      return [];
    }

    if (!categories || categories.length === 0) {
      return products;
    }

    return products.filter(product => categories.find(category => category.id === product.category));
  }

}
