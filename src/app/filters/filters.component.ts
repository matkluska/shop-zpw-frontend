import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoriesService} from '../categories.service';
import {Category} from '../category';
import {PriceRange} from '../price-range';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  providers: [CategoriesService]
})
export class FiltersComponent implements OnInit {
  @Output() checkedCategoriesEvent = new EventEmitter<Category[]>();
  @Output() priceRangeChangedEvent = new EventEmitter<PriceRange>();

  private categories: Category[] = [];
  private checkedCategories: Category[] = [];
  private minPrice: number;
  private maxPrice: number;

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(categories => this.categories = categories);
  }

  toggleCategory(category: Category) {
    const idx = this.checkedCategories.findIndex(c => c.id === category.id);
    if (idx > -1) {
      this.checkedCategories.splice(idx, 1);
    } else {
      this.checkedCategories.push(category);
    }
    this.checkedCategoriesEvent.emit(this.checkedCategories.slice(0));
  }

  priceRangeChanged(minPrice: number, maxPrice: number) {
    this.priceRangeChangedEvent.emit(new PriceRange(minPrice, maxPrice));
  }
}
