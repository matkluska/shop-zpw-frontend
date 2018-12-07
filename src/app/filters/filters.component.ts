import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoriesService} from '../categories.service';
import {Category} from '../category';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  providers: [CategoriesService]
})
export class FiltersComponent implements OnInit {
  @Output() checkedCategoriesEvent = new EventEmitter<Category[]>();

  private categories: Category[] = [];
  private checkedCategories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories();
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
}
