import {Pipe, PipeTransform} from '@angular/core';
import {Product} from '../product';
import {PriceRange} from '../price-range';

@Pipe({
  name: 'price_range'
})
export class PriceRangePipe implements PipeTransform {

  transform(products: Product[], priceRange: PriceRange) {
    if (!products) {
      return [];
    }

    if (!priceRange.minPrice) {
      priceRange.minPrice = 0;
    }

    if (!priceRange.maxPrice) {
      priceRange.maxPrice = Number.MAX_SAFE_INTEGER;
    }

    return products.filter(product => product.price >= priceRange.minPrice && product.price <= priceRange.maxPrice);
  }

}
