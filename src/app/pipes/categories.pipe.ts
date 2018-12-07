import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../product';
import {Category} from '../category';

@Pipe({
  name: 'categories'
})
export class CategoriesPipe implements PipeTransform {

  transform(products: Product[], categories: Category[]) {
    console.log(categories);
    if (!products) {
      return [];
    }

    if (!categories || categories.length === 0) {
      return products;
    }

    return products.filter(product => categories.find(category => category.id === product.category));
  }

}
