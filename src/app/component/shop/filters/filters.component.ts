import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Category} from '../../../model/category';
import {PriceRange} from '../../../model/price-range';
import {CategoriesService} from '../../../service/categories-service';
import {CategoriesServiceFactory} from '../../../service/categories-service-factory';
import {AngularFirestore} from '@angular/fire/firestore';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css'],
  providers: [{
    provide: CategoriesService,
    useFactory: CategoriesServiceFactory,
    deps: [AngularFirestore, HttpClient]
  }]
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
